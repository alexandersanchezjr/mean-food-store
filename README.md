# Food Store Web Application

This is a sample food store web application built using the MEAN stack (MongoDB, ExpressJS, Angular, and NodeJS), incorporating Stripe payments for online transactions. The application allows users to browse through various food items, add them to their cart, and make purchases securely using Stripe's payment gateway.

## Technologies Used

- **MongoDB:** NoSQL database used to store food items, user data, and transaction details.
- **ExpressJS:** Node.js web application framework used for building the backend RESTful API.
- **Angular:** Frontend framework used for building the user interface and client-side functionality.
- **NodeJS:** JavaScript runtime environment used for server-side development.
- **Stripe:** Payment processing platform used to handle online transactions securely.
- **Terraform:** Infrastructure as Code (IaC) tool used to provision and manage cloud resources.
- **Azure Kubernetes Service (AKS):** Managed Kubernetes service provided by Microsoft Azure used to deploy and manage containerized applications.

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=mongodb,express,angular,nodejs,git,terraform,kubernetes,docker,azure" />
  </a>
</p>

## Features

- **User Authentication:** Users can sign up, log in, and manage their profiles.
- **Browse Food Items:** Users can browse through a variety of food items listed in different categories.
- **Add to Cart:** Users can add items to their shopping cart and update quantities as needed.
- **Checkout with Stripe:** Secure checkout process using Stripe's payment gateway for online transactions.
- **Order History:** Users can view their order history and track the status of their orders.

## Deployment

The application is deployed using Terraform IaC in an Azure Kubernetes Service (AKS) cluster. Terraform is used to provision the necessary infrastructure resources including the AKS cluster, Azure Container Registry (ACR), and other networking components. Kubernetes manifests are then applied to deploy the application containers to the AKS cluster.

### Prerequisites

- Azure subscription
- Terraform installed
- Kubernetes CLI (kubectl) installed

### Deployment Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/alexandersanchezjr/mean-food-store.git
   ```

2. **Navigate to the Terraform Directory:**
   ```bash
   cd terraform/
   ```

3. **Initialize Terraform:**
   ```bash
   terraform init
   ```

4. **Review Terraform Plan:**
   ```bash
   terraform plan
   ```

5. **Apply Terraform Changes:**
   ```bash
   terraform apply
   ```
6. **Get the Kubernetes Configuration:**
   ```bash
   az aks get-credentials --resource-group <resource-group-name> --name <aks-cluster-name>
   ```

7. **Deploy Kubernetes Manifests:**
   ```bash
   kubectl apply -f kubernetes/expressjs
   kubectl apply -f kubernetes/angular
   ```

8. **Access the Application:**
   Once the deployment is complete, the application will be accessible at the specified URL. You can obtain the URL using `kubectl` commands or through the Azure portal.

## Contributions

Contributions are welcome! Feel free to submit pull requests or open issues for any improvements, bug fixes, or feature requests.

## Current access IP 
```
http://4.156.62.178
```

## Access credentials
```
email: smarttalent@smarttalent.com
password: smarttalent123
```
---