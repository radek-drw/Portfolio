output "contact_api_url" {
  description = "Endpoint used by the frontend to submit contact form data"
  value       = "${module.api.api_url}/contact"
}
