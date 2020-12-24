using Microsoft.EntityFrameworkCore;
using Sale.Check.In.WebApp.DBContexts;
using Sale.Check.In.WebApp.Interface;
using Sale.Check.In.WebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sale.Check.In.WebApp.Managers
{
    /// <summary>
    /// User manager
    /// </summary>
    public class UserManager : IUserManager
    {
        private readonly ILoggerService _logger;
        private readonly MyDBContext _context;

        public UserManager(ILoggerService logger, MyDBContext context)
        {
            _logger = logger;
            _context = context;
        }

        /// <summary>
        /// Check Login User
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns>return ture if user exist </returns>
        public async Task<bool> CheckLoginUser(LoginModel loginModel)
        {
            _logger.LogInfo("Check Login User Start.");
            var result = false;
            try
            {
                var res = await _context.SoUser.Where(e => e.U_Username == loginModel.Username && e.U_Password == loginModel.Password).CountAsync();
                if (res > 0)
                {
                    result = true;
                }
                else
                {
                    result = false;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Check Login User" + ex);
            }

            _logger.LogInfo("Check Login User End.");
            return result;
        }

        /// <summary>
        /// Check Login User
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns>return ture if user exist </returns>
        public async Task<int> GetUserId(LoginModel loginModel)
        {
            _logger.LogInfo("Get User Id Start.");
            var result = 0;
            try
            {
                var res = await _context.SoUser.Where(e => e.U_Username == loginModel.Username && e.U_Password == loginModel.Password).FirstOrDefaultAsync();
                if (res != null)
                {
                    result = res.U_Id;
                }
                else
                {
                    result = 0;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Get User Id " + ex);
            }

            _logger.LogInfo("Get User Id  End.");
            return result;
        }

    }
}
