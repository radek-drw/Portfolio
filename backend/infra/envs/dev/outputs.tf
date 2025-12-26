output "contact_api_url" {
  value       = "${module.api.api_url}/contact"
  description = "Endpoint used by the frontend to submit contact form data"
}
