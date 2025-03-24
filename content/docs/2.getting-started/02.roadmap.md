---
title: Project roadmap
description: Project planification for the IoT Platform
---

The project will have several milestones, and all of them include several tasks to be completed in order to achieve the milestone

- [Project setup](#project-setup)
- [Sensors integration](#sensors-integration)
- [Prometheus connector](#prometheus-connector)
- [Grafana dashboards](#grafana-dashboards)
- [Connect Nuxt visualizations to prometheus](#connect-nuxt-visualizations-to-prometheus)
- [Sensor programation over the wire](#sensor-programation-over-the-wire)
- [Automatic sensor programs](#automatic-sensor-programs)

## Project setup
The objective of this milestone is to be ready for having a continuos delivery of features for the product. All the necessary developer quality of life tools must be ready in order to complete this phase.


- [X] Add OAuth authentication vie Github
- [X] Add authentication middlewares
- [X] Add nuxt content with a mix of "natural" vue components
- [X] Add a logger for seeing logs on deployments
- [X] Prepare event handlers for application
- [X] Prepare nuxt modules for making development easier
- [X] Add onboarding documentation for contributors
- [X] Create navigation layout compatible with content and natural pages
- [ ] Automate deployments via Github workflows
- [ ] Sentry integration for error monitoring
- [ ] Investigate the possibility for adding analytics for the site

## Sensors integration
This phase will be in charge of preparing the sensors integration in the platform for their future use with tools such as prometheus and grafana.

- [X] Data structure for sensors
    - [X] Add sensors table
    - [ ] Add measurements tables
    - [ ] Add units tables
- [X] APIs
    - [X] List
    - [X] Add pagination to list
    - [X] List sensor measurements
    - [X] Create
    - [X] Update
    - [X] Delete
    - [ ] Add filters
    - [ ] Add Order by
    - [ ] Make filters and order by generic for others view usages
    - [ ] Add credentials for sensors
    - [ ] Endpoint for registering measurement for sensors (Investigate if the implementation would be better using mqtt through cloudflare)
- [ ] UI
    - [ ] Sensors Table
        - [ ] Refresh button
        - [ ] Search input
        - [ ] Add filters
        - [ ] Order by
        - [ ] Add pagination
    - [ ] Create sensors documentation
    - [ ] Create connection string for the sensors

- [ ] Devices
    - [ ] Connect first device

## Prometheus connector

## Grafana dashboards

## Connect Nuxt visualizations to prometheus

## Sensor programation over the wire

## Automatic sensor programs
