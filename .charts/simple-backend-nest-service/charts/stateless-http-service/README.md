# stateless-http-service

Installs a simple, single-container service with a single port exposed. See
[`values.yaml`](https://github.com/procore/simple-backend-nest-service/blob/main/.charts/simple-backend-nest-service/charts/stateless-http-service/values.yaml)
for a full details on the required and available chart values.

This chart assumes that your service

- Boots as the entrypoint for {{.Values.image}}
- Binds to $PORT on boot
- Implements a `/health` check that responds OK if and only if the service is
  ready to receive traffic
- Produces standard JSON-structured logs to STDOUT

and that it is configurable with the following environment variables

- `PORT` - HTTP port to bind to
- `NEW_RELIC_ENABLED` - New Relic reporting should be enabled if and only if `true`
- `NEW_RELIC_LICENSE_KEY` - provided from a secret if New Relic is enabled
- `ERROR_HANDLER` - will be `bugsnag` if Bugsnag is enabled; otherwise, errors
  should be logged to STDOUT
- `BUGSNAG_API_KEY` - provided from a secret if Bugsnag is enabled
- `METRICS_HANDLER` - will be `datadog` if Datadog is enabled; otherwise, metrics
  should be logged to STDOUT
- `DATADOG_AGENT_HOST` - provided if Datadog is enabled

[#team-application-infrastructure](https://procoretech.slack.com/archives/C018R4BHW74))
is committed to developing libraries to make these configurations easy to
implement and available by default. Please reach out with any questions.

## Ingress
There are two ingress configurations available, private ingress and VPN ingress.

Private ingress is used for service to service traffic internal to Procore's AWS VPCs
and should be configured with `procoretech.internal` domains.  The istio gateway provided 
for private ingress is named `istio-private-ingressgateway` for all clusters and uses 
Procore's private CA to generate SSL certificates.  Any services which need to communicate 
with your service's private ingress will need to have Procore's private CA bundled so that
the SSL certificate is recognized as valid.

VPN ingress is available for applications which provide a "Procore employee only" UI
that should be accessible via GlobalProtect VPN or on-premises networks and should be
configured with `procoretech-qa.com` domain for staging and `procoretech.com` domain 
for production.  The istio gateway provided for private ingress is named 
`istio-private-vpn-ingressgateway` for all clusters and uses the Amazon CA to generate 
SSL certificates.

If your application requires public ingress, traffic 
[should be routed through frontdoor](https://github.com/procore/puppet/blob/master/procore-modules/procore/templates/envoy/frontdoor-cds-config.yaml.erb#L186-L215) 
to leverage built in protections such as WAF.

## Local Development

If you are developing on these charts locally, e.g. using `skaffold` and `kind`,
you do not need to report telemetry externally. To specifically test these
external integrations, you will need to enable them in `values.yaml` and supply
appropriate credentials.

In order to provide your service with New Relic and Bugsnag credentials, you
will need to create a secret called `{serviceName}-secret`
with `new_relic_license_key` and `bugsnag_api_key` set, e.g.

```bash
kubectl create secret generic \
 $SERVICE-secret \
  -n $SERVICE \
  --from-literal=new_relic_license_key=$NEW_RELIC_LICENSE_KEY \
  --from-literal=bugsnag_api_key=$BUGSNAG_API_KEY
```
