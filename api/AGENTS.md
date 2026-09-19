# AGENTS.md

## Project

Capital Vantage backend.

Stack:

- Java 25
- Spring Boot 4.0.6
- Maven
- Spring Web
- Spring Boot Test

This is a Spring Boot REST API project. Keep the code simple, clean, and maintainable.

## Main Rule

Make the smallest correct change for the requested task.

Do not rewrite unrelated code.
Do not introduce unnecessary abstractions.
Do not add dependencies unless explicitly requested.
Do not create empty packages or placeholder classes.

## Architecture Style

Use a simple layered Spring Boot structure.

Preferred package layout:

```text
com.capitalvantage.backend
├── config
├── controller
├── dto
│   ├── request
│   └── response
├── exception
├── model
├── service
└── util
```

Use only the packages needed for the task.

## Layer Rules

### Controller

Controllers should only handle HTTP concerns.

They should:

- Define REST endpoints
- Accept request DTOs
- Return response DTOs
- Delegate business logic to services
- Use proper HTTP status codes

Controllers should not contain business logic.

### Service

Services should contain business logic.

They should:

- Validate use-case rules
- Coordinate application logic
- Keep methods readable and focused
- Throw clear exceptions for invalid cases

### DTO

Use DTOs for request and response bodies.

Prefer Java records for simple DTOs.

Example:

```java
public record CreatePortfolioRequest(
        String name
) {
}
```

Keep request and response DTOs separate.

### Model

Use models for internal application objects.

Do not expose internal models directly from controllers when a DTO is more appropriate.

### Exception

Use custom exceptions for expected application errors.

Use a global exception handler when needed.

Preferred annotation:

```java
@RestControllerAdvice
```

Return clear and consistent error responses.

## Coding Style

Write straightforward Java.

Prefer:

- Clear class names
- Clear method names
- Small methods
- Constructor injection
- Immutable objects where practical
- Java records for simple data carriers
- Explicit error handling
- Simple readable control flow

Avoid:

- Field injection
- Large methods
- Large utility classes
- Static mutable state
- Deep inheritance
- Overly generic abstractions
- Unused interfaces
- Unused classes
- Unnecessary comments
- Unrelated formatting changes

## Dependency Injection

Use constructor injection.

Good:

```java

@Service
public class PortfolioService {

    private final SomeDependency someDependency;

    public PortfolioService(SomeDependency someDependency) {
        this.someDependency = someDependency;
    }
}
```

Avoid:

```java

@Autowired
private SomeDependency someDependency;
```

## REST API Style

Use `/api/v1` as the base path for APIs.

Use resource-based endpoint names.

Use proper HTTP methods:

```text
GET
POST
PUT
PATCH
DELETE
```

Use proper response statuses:

```text
200 OK
201 Created
204 No Content
400 Bad Request
404 Not Found
500 Internal Server Error
```

Use `ResponseEntity` when the status code needs to be explicit.

## Validation

Do not add validation dependencies unless requested.

If validation is already available in the project, use standard validation annotations.

Keep simple input checks close to the service logic when validation support is not configured.

## Testing

Use the existing Spring Boot test setup.

Add tests when adding meaningful behavior.

Prefer:

- Service tests for business logic
- Controller tests for API behavior
- Simple tests over complex test setup

Run tests before finishing when possible:

```bash
mvn test
```

If Maven wrapper exists, prefer:

```bash
./mvnw test
```

## Maven Rules

Do not modify `pom.xml` unless the task requires it.

Do not add libraries such as Lombok, JPA, Security, Swagger, MapStruct, or database drivers unless explicitly requested.

## Codex Instructions

When working on this repository:

- Inspect existing code before changing files
- Follow existing naming and formatting
- Keep changes focused on the requested task
- Do not invent features

## Commit Messages

Use lowercase commit messages in the format `<tag>: <message>`.

Allowed tags:

- `fix`: bug fixes
- `feat`: backwards-compatible enhancements or rule changes that add reported problems
- `docs`: documentation-only changes
- `chore`: non-user-facing changes
- `build`: build-process-only changes
- `refactor`: changes that do not affect APIs or user experience
- `test`: test-only changes
- `ci`: CI configuration or script changes
- `perf`: performance improvements
- Do not add unused files
- Do not add unnecessary comments
- Do not change package names without a clear reason
- Do not introduce a database, authentication, or external service unless requested
- Prefer simple working Spring Boot code

## Financial Calculation Precision

- Any code that handles money, prices, quantities, portfolio values, or transaction amounts must use precise calculations.
- Use `BigDecimal` for financial values.
- Do not use `double` or `float` for money or transaction calculations.
- Make rounding explicit when needed.
- Do not approximate financial transaction values.
- Keep calculation logic easy to read, verify, and test.

## Final Response Format

After completing a task, report:

- Files changed
- What was implemented
- Tests run
- Any assumptions made

## Build Verification

After completing code changes, run a build without tests to verify that the project compiles successfully.

Use:

```bash
mvn clean package -DskipTests
```

If the Maven wrapper exists, prefer:

```bash
./mvnw clean package -DskipTests
```

Do not run the full test suite unless explicitly requested.

In the final response, mention whether the build passed or failed.
