using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sale.Check.In.Gateway.Model
{
    public class SoUser
    {
        public int U_Id { get; set; }
        public int U_CodeOnBPlus { get; set; }
        public int U_Id_FJ { get; set; }
        public string U_Name { get; set; }
        public string U_Surname { get; set; }
        public string U_CardID { get; set; }
        public string U_Position { get; set; }
        public string U_Username { get; set; }
        public string U_Password { get; set; }
        public int U_Salespace { get; set; }
        public string U_Remark { get; set; }
        public int U_Workstatus { get; set; }
        public DateTime U_Timer { get; set; }
        public string U_Salecode { get; set; }
        public Enum U_SALELIST { get; set; }
        public string US_EMAIL { get; set; }
        public int US_PCODE { get; set; }
        public int US_MOBILE { get; set; }
        public int US_TELOFFICE { get; set; }

        public string U_APPUUID { get; set; }
        public string U_APPMODEL { get; set; }
        public string U_APPPASS { get; set; }
        public DateTime U_LASTUPDATE { get; set; }
    }
}
