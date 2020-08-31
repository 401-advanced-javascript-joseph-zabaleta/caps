# Code Academy Parcel Service (CAPS)

## Table of Contents
- [Authentication Server / Module](#authentication-server-/-module)
    - [Overview](#overview)
    - [Development Process](#development-process)
        - [Phase 1: Event Driven Applications](#phase-1-event-driven-applications)
        - [Phase 2: Networked events with TCP](#phase-2-networked-events-with-tcp)
        - [Phase 3: Socket.io](#phase-3-socket.io)
        - [Phase 4: Queues](#phase-4-queues)
    - [Installation](#installation)
    - [Author](#author)
    - [Collaborations](#collaborations)
    - [License](#license)
    - [Acknowledgements / Resources](#acknowledgements-/-resources)

## Overview
A real-time service that allows for vendors, such as flower shops or restaurants, to alert a system of a package needing to be delivered, for drivers to instantly see what’s in their pickup queue, and then to alert the vendors as to the state of the deliveries (in transit, and then delivered).


## Development Process
Current Phase: 1

#### Phase 1: Event Driven Applications
- Using built-in Node.js events to simulate realtime package delivery changes

#### Phase 2: Networked events with TCP
- Networked version of the app using TCP
- Creation of the Hub, Vendor, and Driver apps as separate applications, networked together

#### Phase 3: Socket.io
- Replace TCP with socket.io
- Cleaner event handling
- Allows web connectivity

#### Phase 4: Queues
- Adding in the delivery queue logic
- Storage of all inbound events
- Receipt confirmation
- Catchup Mode

## Installation
- Clone down a copy of the repository.
- First step is to run `npm install` to receive all the dependencies
- To start this server the following commands are supported:
    - `npm start`
    - `node hub.js`

## Author
- Software Developer: Joseph Zabaleta
  - [Official Github](https://github.com/joseph-zabaleta)

## Collaborations
- none

## License
This project is under the MIT License.

## Acknowledgements / Resources
- none
