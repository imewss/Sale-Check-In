using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sale.Check.In.Gateway.Model
{
    public class Amphur
    {
        public int Amphur_id { get; set; }
        public string Amphur_code { get; set; }
        public string Amphur_name { get; set; }
        public int Geo_id { get; set; }
        public int Province_id { get; set; }
    }
}
