using Microsoft.AspNetCore.Mvc;
using Sale.Check.In.Gateway.Interface;

namespace Sale.Check.In.Gateway.Controllers
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
