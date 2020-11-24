using System.Collections.Generic;

namespace Sale.Check.In.Gateway.Configuration
{
    public class Configuration
    {

        public string[] EnumAllowUnknown { get; set; }

        public Dictionary<string, string> UserRoleAllowClients { get; set; }
    }
}
