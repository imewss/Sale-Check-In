using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sale.Check.In.Gateway.Model
{
    public class District
    {
        public int District_id { get; set; }
        public string District_code { get; set; }
        public string District_name { get; set; }
        public int Amphur_id { get; set; }
        public int Province_id { get; set; }
        public int Geo_id { get; set; }
    }
}
