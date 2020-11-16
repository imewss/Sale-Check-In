using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APITemplate.Configuration
{
    public class Configuration
    {

        public string[] EnumAllowUnknown { get; set; }

        public Dictionary<string, string> UserRoleAllowClients { get; set; }
    }
}
