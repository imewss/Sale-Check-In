using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APITemplate.Extensions
{
    public static class SwaggerExtension
    {
        /// <summary>
        /// Adds the custom swagger.
        /// </summary>
        /// <param name="services">The services.</param>
        /// <param name="configuration">Configuration file</param>
        public static void AddCustomSwagger(this IServiceCollection services, IConfiguration configuration)
        {
           
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Sample API",
                    Description = "A simple example ASP.NET Core Web API",
                    TermsOfService = new Uri("https://example.com/terms"),
                
                });
            });
        }

        /// <summary>
        /// User custom middleware to serve generated Swagger as a JSON endpoint. And Enable middleware to serve swagger-ui
        /// </summary>
        /// <param name="app">Application param</param>
        /// <param name="configuration">Configuration file</param>
        public static void UseCustomerSwagger(this IApplicationBuilder app, IConfiguration configuration)
        {
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("../swagger/v1/swagger.json", "Pay Society Sample Service/Gateway");
            });
        }
    }
}
