using Microsoft.EntityFrameworkCore;
using Sale.Check.In.WebApp.DBContexts;
using Sale.Check.In.WebApp.Extension;
using Sale.Check.In.WebApp.Interface;
using Sale.Check.In.WebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Sale.Check.In.WebApp.Managers
{
    /// <summary>
    /// Check In Manager
    /// </summary>
    public class CheckInManager : ICheckInManager
    {
        private readonly ILoggerService _logger;
        private readonly MyDBContext _context;

        public CheckInManager(ILoggerService logger, MyDBContext context)
        {
            _logger = logger;
            _context = context;
        }

        /// <summary>
        /// Add Check In
        /// </summary>
        /// <param name="checkInModel"></param>
        /// <returns>check in result </returns>
        public async Task<CheckinHistory> AddCheckIn(CheckInModel checkInModel)
        {
            _logger.LogInfo("Add Check In Start.");
            CheckinHistory result = new CheckinHistory();
            try
            {

                CheckinHistory checkinHistory = new CheckinHistory();
                checkinHistory.Latitude = checkInModel.Latitude;
                checkinHistory.Longitude = checkInModel.Longitude;
                checkinHistory.ShopName = checkInModel.ShopName;
                checkinHistory.ShopType = checkInModel.ShopType;
                checkinHistory.CustomerType = checkInModel.CustomerType;
                checkinHistory.Province = checkInModel.Province;
                checkinHistory.Amphur = checkInModel.District;
                checkinHistory.District = checkInModel.District;
                checkinHistory.ReportType = checkInModel.ReportType;
                checkinHistory.Note = checkInModel.Note;
                checkinHistory.ReceiptFile = checkInModel.ReceiptFile;
                checkinHistory.MimeType = checkInModel.MimeType;
                checkinHistory.CreatedDate = DateTime.Now;
                checkinHistory.User_Id = checkInModel.UserId;

                _context.Entry(checkinHistory).State = EntityState.Added;
                _context.SaveChanges();

                result = checkinHistory;
            }
            catch (Exception ex)
            {
                _logger.LogError("Add Check In" + ex);
            }

            _logger.LogInfo("Add Check In End.");
            return result;
        }

        /// <summary>
        /// get province
        /// </summary>
        /// <returns> province </returns>
        public async Task<List<SoProvince>> GetProvince()
        {
            _logger.LogInfo("Get Province Start.");
            var result = new List<SoProvince>();
            try
            {
                result = await _context.SoProvince.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError("Get Province" + ex);
            }

            _logger.LogInfo("Get Province End.");
            return result;
        }

        /// <summary>
        /// Get Amphur
        /// </summary>
        /// <param name="provinceId"></param>
        /// <returns> Amphur </returns>
        public async Task<List<Amphur>> GetAmphur(int provinceId)
        {
            _logger.LogInfo("Get Amphur Start.");
            var result = new List<Amphur>();
            try
            {
                result = await _context.Amphur.Where(i => i.Province_id == provinceId).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError("Get Amphur" + ex);
            }

            _logger.LogInfo("Get Amphur End.");
            return result;
        }

        /// <summary>
        /// Get District
        /// </summary>
        /// <param name="districtId"></param>
        /// <returns>list of district</returns>
        public async Task<List<District>> GetDistrict(int districtId)
        {
            _logger.LogInfo("Get District Start.");
            var result = new List<District>();
            try
            {
                result = await _context.District.Where(t => t.District_Id == districtId).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError("Get District" + ex);
            }

            _logger.LogInfo("Get District End.");
            return result;
        }

        /// <summary>
        /// get shop type
        /// </summary>
        /// <returns> shop type </returns>
        public async Task<List<ShopType>> GetShopType()
        {
            _logger.LogInfo("Get shop type Start.");
            var result = new List<ShopType>();
            try
            {
                result = await _context.ShopType.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError("Get shop type" + ex);
            }

            _logger.LogInfo("Get shop type End.");
            return result;
        }

        /// <summary>
        /// Get check In histories
        /// </summary>
        /// <param name="sortFiled"></param>
        /// <param name="isOrderByAsc"></param>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public async Task<ListCollectionCheckInHistoriesModel> GetCheckInHistories(int userId, string sortFiled, bool isOrderByAsc, int page, int limit)
        {
            _logger.LogInfo("GetCheckInHistories Start ");
            try
            {
                IQueryable<CheckinHistory> result;
                if(isOrderByAsc)
                {
                    result = _context.CheckinHistory.Where(t => t.User_Id == userId).OrderBy(e => e.CreatedDate);
                }else
                {
                    result = _context.CheckinHistory.Where(t => t.User_Id == userId).OrderByDescending(e => e.CreatedDate);
                }
           
                return await result.ToListCollectionCheckInHistoriesPagingAsync(sortFiled, page, limit, isOrderByAsc);
            }
            catch (Exception ex)
            {
                _logger.LogError("GetCheckInHistories " + ex);
                throw ex;
            }
        }

        /// <summary>
        /// Get Latest CheckIn 
        /// </summary>
        /// <returns> latest check in </returns>
        public async Task<CheckinHistory> GetLatestCheckIn()
        {
            _logger.LogInfo("Get Latest CheckIn Start.");
            var result = new CheckinHistory();
            try
            {
                result = await _context.CheckinHistory.OrderByDescending(e => e.CreatedDate).FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError("Get Latest CheckIn " + ex);
            }

            _logger.LogInfo("Get Latest CheckIn End.");
            return result;
        }


    }
}
