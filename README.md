# DishDiscover

DishDiscover is a Web App to post and get recipes. 

## Table of Contents

- [Project Description](#project-description)
- [Architecture](#architecture)
- [Cluster Architecture](#cluster-architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Deployment](#deployment)
- [License](#license)

## Project Description

This project aims to facilitate and help people discover new dishes from all around the world. Also, it's to a great oppurtunity to learn how to use microk8s, NGINX and metalLB to deploy applications on the cloud. 

## Architecture

The DishDiscover web app consists of three main components:

1. Frontend: The frontend is responsible for the user interface and interaction. It is built using HTML, CSS, and JavaScript, and communicates with the backend to fetch and display data.

2. Backend: The backend handles the business logic and data processing. It is implemented using Node.js and Express.js framework. The backend interacts with the PostgreSQL database to store and retrieve recipe data.

3. Database: The PostgreSQL database is used to store recipe information. It provides a reliable and scalable solution for data persistence.

## Cluster Architecture

The DishDiscover web app is deployed using microk8S, which provides a scalable and reliable platform for managing containerized applications. The cluster architecture consists of several key components:

### Containers

  - `postrecipe`:
    - Port: 3002
    - Environment Variables: DB_USER=recipe_user DB_HOST=recipes_db RECIPE_DB=recipes_db DB_PASSWORD=user DB_PORT=5432
 
  - `getrecipe`:
    - Port: 3001
    - Environment Variables: DB_USER=recipe_user DB_HOST=recipes_db RECIPE_DB=recipes_db DB_PASSWORD=user DB_PORT=5432
 
  - `postgres`:
    - Port: 5432
    - Environment Variables: POSTGRES_PASSWORD=user
 


### Pods

![alt text](<Images/Screenshot from 2024-02-24 12-15-34.png>)


### Services

![alt text](<Images/Screenshot from 2024-02-24 12-20-56.png>)

### Load Balancers

Load balancers distribute incoming network traffic across multiple pods to ensure scalability. In the DishDiscover web app, an NGINX load balancer (controller) follows the rules of the `Ingress` and receives through the external IP address assigned by `metalLB`.

### Ingress

Ingress is an API object that manages external access to services within a cluster. It acts as a reverse proxy and routes incoming requests to the appropriate backend service.

![alt text](<Images/Screenshot from 2024-02-24 12-30-36.png>)

![alt text](<Images/Screenshot from 2024-02-24 12-33-44.png>)

### Persistent Volumes (PV) and Persistent Volume Claims (PVC)

Persistent volumes provide a way to store data in a durable and independent manner. Persistent volume claims are used to request specific storage resources from the cluster. In the DishDiscover web app, PVs and PVCs are used to store and retrieve recipe data in the PostgreSQL database.

![alt text](<Images/Screenshot from 2024-02-24 12-36-30.png>)

### MetalLB Endpoint

MetalLB is a load balancer implementation for bare metal Kubernetes clusters. It provides a network load balancer implementation that integrates with standard network equipment.


## Installation

This guide will walk you through the process of setting up a Kubernetes cluster using MicroK8s, enabling MetalLB for load balancing, installing NGINX Ingress Controller with Helm, applying necessary YAML files, and testing your setup.

### Prerequisites

Before you begin, ensure you have the following prerequisites installed:

- MicroK8s
- Helm
- kubectl

### Step 1: Install MicroK8s

Follow the instructions provided by the official MicroK8s documentation to install MicroK8s on your system.

- [MicroK8s Installation Guide](https://microk8s.io/docs)

### Step 2: Enable MetalLB

MetalLB is a load balancer implementation for Kubernetes clusters. Enable MetalLB in your MicroK8s cluster by running the following command:


```microk8s enable metallb 192.XXX.XXX.XXX-192.XXX.XXX.XXX```

### Step 3: Install NGINX Ingress Controller with Helm

Use Helm to install NGINX Ingress Controller into your Kubernetes cluster. Ensure Helm is installed and initialized on your system.

```helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx```
```helm repo update```
```helm install nginx-ingress ingress-nginx/ingress-nginx```



### Step 4: Apply YAML files

```kubectl apply -f your-application.yaml```

### Step 5: Verify Installation

Check if all components are running correctly by verifying the status of your deployments, services, and pods.

```kubectl get all```

### Step 6: Test Your Setup

Ensure that the Loadbalancer got an external ip adress. Try pinging that address if it succeeds try accessing the external-ip address on your browser. If it does not work try adding a `Host` in the ingress. Ensure you add that domain name and external ip to the local dns in you machine.



