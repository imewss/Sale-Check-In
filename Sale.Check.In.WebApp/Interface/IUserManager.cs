using Sale.Check.In.WebApp.Models;
using System.Threading.Tasks;

namespace Sale.Check.In.WebApp.Interface
{
    /// <summary>
    /// User Manager Interface
    /// </summary>
    public interface IUserManager
    {

        /// <summary>
        /// Check Login User
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns>return ture if user exist </returns>
        Task<bool> CheckLoginUser(LoginModel loginModel);

        /// <summary>
        /// Check Login User
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns>return ture if user exist </returns>
        Task<int> GetUserId(LoginModel loginModel);
    }
}
