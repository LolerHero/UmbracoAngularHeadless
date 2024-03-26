WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
var env = builder.Environment;
var config = builder.Configuration;
var umbracoDomain = Environment.GetEnvironmentVariable("UMBRACO_DOMAIN");


builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddWebsite()
    .AddDeliveryApi()
    .AddComposers()
    .Build();

WebApplication app = builder.Build();

await app.BootUmbracoAsync();

app.UseUmbraco()
    .WithMiddleware(u =>
    {
        app.UseCors(x => x
            .AllowAnyHeader()
            .AllowAnyMethod()
            .SetIsOriginAllowed(origin => true)
            .WithOrigins(umbracoDomain ?? string.Empty)
        );
        u.UseBackOffice();
        u.UseWebsite();
    })
    .WithEndpoints(u =>
    {
        u.UseInstallerEndpoints();
        u.UseBackOfficeEndpoints();
        u.UseWebsiteEndpoints();
    });

await app.RunAsync();
