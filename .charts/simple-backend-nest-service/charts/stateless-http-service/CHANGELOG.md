# Changelog

* [Changelog](#changelog)
  * [3.2.0 (2021-11-19)](#320-2021-11-19)
  * [3.1.1 (2021-11-15)](#311-2021-11-15)
  * [3.1.0 (2021-11-15)](#310-2021-11-15)
  * [3.0.1 (2021-11-15)](#301-2021-11-15)
  * [3.0.0 (2021-11-09)](#300-2021-11-09)
    * [Breaking Changes](#breaking-changes)
  * [2.0.0 (2021-10-07)](#200-2021-10-07)
  * [1.3.1 (2021-09-16)](#131-2021-09-16)
  * [1.3.0 (2021-09-16)](#130-2021-09-16)
  * [1.2.2 (2021-09-14)](#122-2021-09-14)
  * [1.2.0 (2021-06-03)](#120-2021-06-03)
  * [1.0.0 (2021-06-03)](#100-2021-06-03)
    * [Breaking Changes](#breaking-changes-1)
  * [1.0.0 (2021-06-03)](#100-2021-06-03-1)
    * [Breaking Changes](#breaking-changes-2)

All notable changes to this chart will be documented in this file.

## 3.2.0 (2021-11-19)

* Use nodeAffinity to select the preferred workload via the `nodeGroup` value, rather than using nodeSelector.

## 3.1.1 (2021-11-15)

* [bugfix] Update resource limits and requests to use quoted values to ensure that Horizontal Pod Autoscaler is [Happy](https://stackoverflow.com/questions/62800892/kubernetes-hpa-on-aks-is-failing-with-error-missing-request-for-cpu).

## 3.1.0 (2021-11-15)

* Update stateless-http-service template for the removal of the `default` node group.

## 3.0.1 (2021-11-15)

* Update stateless-http-service template for conditional nodeGroup and image reference in order to make use cases like local dev with skaffold easier.

## 3.0.0 (2021-11-09)

### Breaking Changes

* Update stateless-http-service template to use `.Values.image.tag` and `.Values.image.repository` to support Argo CD deployment requirements.
  * This will break Tugboat deployments until [DEVENV-405](https://procoretech.atlassian.net/browse/DEVENV-405) is resolved.

## 2.0.0 (2021-10-07)

* Updates virtual service and removes gateway according to documentation on ingress configuration. See docs [here](https://procoretech.atlassian.net/wiki/spaces/CSE/pages/2224195637/Ingress+configuration+and+Gateway+Virtual+Service+requirements+and+information+living+document).

BREAKING
* gateway names are now required to be specified for private ingress.

## 1.3.1 (2021-09-16)

* No changes. Version bumped to trigger chart release action.

## 1.3.0 (2021-09-16)

* Adds feature to select a desired workload target for deployment pods.

## 1.2.2 (2021-09-14)

* Bug fix: Fixed implementation of parametrized `livenessProbe`.

## 1.2.0 (2021-06-03)

* Added optional, parametrized `probes` configuration, to allow for customizing
  various [Kubernetes probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/).

## 1.0.0 (2021-06-03)


### Breaking Changes

* ENV var `CLUSTER` added with default value of `us01`, used to construct
  default host names in `gateway.yaml`, `gateway-vpn.yaml`,
  `virtual-service.yaml`, and `virtual-service-vpn.yaml`

## 1.0.0 (2021-06-03)


### Breaking Changes

* \_helpers.tpl moved to a library subchart so that it can be shared.
