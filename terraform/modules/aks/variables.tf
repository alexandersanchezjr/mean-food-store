variable "resource_group_location" {
  type        = string
  description = "The location/region where the resource group will be created."
}

variable "resource_group_name" {
  type        = string
  description = "The name of the resource group in which to create the AKS cluster."
}

variable "parent_id" {
  type        = string
  description = "The ID of the resource group in which to create the AKS cluster."
}

variable "node_count" {
  type        = number
  description = "The initial quantity of nodes for the node pool."
  default     = 1
}

variable "msi_id" {
  type        = string
  description = "The Managed Service Identity ID. Set this value if you're running this example using Managed Identity as the authentication method."
  default     = null
}

variable "username" {
  type        = string
  description = "The admin username for the new cluster."
  default     = "azureadmin"
}