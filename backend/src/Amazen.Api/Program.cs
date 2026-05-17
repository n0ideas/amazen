var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.UseHttpsRedirection();

var testData = new
{
    message = "Amazen API is connected",
    version = 12,
    updatedAt = "2026-03-14"
};

app.MapGet("/api/test-data", () => Results.Ok(testData));
app.MapGet("/test-data", () => Results.Ok(testData));

app.Run();
