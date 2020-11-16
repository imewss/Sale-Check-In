using APITemplate.Interface;
using Microsoft.AspNetCore.Mvc;

namespace APITemplate.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly ILoggerService _logger;
        public HomeController(ILoggerService logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public bool Get()
        {
            _logger.LogInfo("Test Log");
            return true;
        }
    }
}
