# Architecture Overview

The project is organized as a two-app workspace:

- `backend`: Express REST API with MongoDB persistence and module-based boundaries.
- `frontend`: React Vite app with feature folders and shared UI.

Backend modules should own their routes, controllers, services, validators, and data access logic. Shared cross-cutting code belongs in top-level folders such as `middlewares`, `config`, `utils`, and `constants`.

AI functionality is isolated under the `ai` module so provider-specific code can be replaced without changing product, order, or customer workflows.

