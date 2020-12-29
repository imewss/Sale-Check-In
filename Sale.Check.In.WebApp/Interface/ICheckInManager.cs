using Sale.Check.In.WebApp.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sale.Check.In.WebApp.Interface
{
    /// <summary>
    /// Check In manager Interface
    /// </summary>
    public interface ICheckInManager
    {
        /// <summary>
        /// Add Check In
        /// </summary>
        /// <param name="checkInModel"></param>
        /// <returns>check in result </returns>   
        Task<CheckinHistory> AddCheckIn(CheckInModel checkInModel);

        /// <summary>
        /// get province
        /// </summary>
        /// <returns> province </returns>
        Task<List<SoProvince>> GetProvince();

        /// <summary>
        /// Get Amphur
        /// </summary>
        /// <param name="provinceId"></param>
        /// <returns> Amphur </returns>
        Task<List<Amphur>> GetAmphur(int provinceId);

        /// <summary>
        /// Get District
        /// </summary>
        /// <param name="districtId"></param>
        /// <returns>list of district</returns>
        Task<List<District>> GetDistrict(int districtId);

        /// <summary>
        /// get shop type
        /// </summary>
        /// <returns> shop type </returns>
        Task<List<ShopType>> GetShopType();

        /// <summary>
        /// Get Checkin Histories
        /// </summary>
        /// <param name="userId"></param>
        ///// <returns> Checkin History</returns>
        //Task<List<CheckinHistory>> GetCheckinHistories(int userId);

        /// <summary>
        /// Get check In histories
        /// </summary>
        /// <param name="sortFiled"></param>
        /// <param name="isOrderByAsc"></param>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        Task<ListCollectionCheckInHistoriesModel> GetCheckInHistories(int userId, string sortFiled, bool isOrderByAsc, int page, int limit);

        /// <summary>
        /// Get Latest CheckIn 
        /// </summary>
        /// <returns> latest check in </returns>
        Task<CheckinHistory> GetLatestCheckIn();
    }
}
