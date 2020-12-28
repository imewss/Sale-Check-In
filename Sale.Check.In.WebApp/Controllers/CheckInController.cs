using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sale.Check.In.WebApp.DBContexts;
using Sale.Check.In.WebApp.Interface;
using Sale.Check.In.WebApp.Managers;
using Sale.Check.In.WebApp.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sale.Check.In.WebApp.Controllers
{
    /// <summary>
    /// Check In controller
    /// </summary>
    [Route("api/[controller]")]
    public class CheckInController : Controller
    {
        private readonly ILoggerService _logger;
        private readonly ICheckInManager _checkInManager;

        /// <summary>
        /// Check In controller
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="checkInManager"></param>
        public CheckInController(ILoggerService logger, ICheckInManager checkInManager)
        {
            _logger = logger;
            _checkInManager = checkInManager;
        }

        /// <summary>
        /// Add Check In
        /// </summary>
        /// <param name="checkInModel"></param>
        /// <returns> check in result </returns>
        [HttpPost]
        [Route("CheckIn")]
        [Authorize]
        public async Task<CheckinHistory> AddCheckIn([FromBody] CheckInModel checkInModel)
        {
            _logger.LogInfo("Add Check In Start.");
            CheckinHistory result = new CheckinHistory();
            try
            {
                result = await _checkInManager.AddCheckIn(checkInModel);
            }
            catch (Exception ex)
            {
                _logger.LogError("Add Check In" + ex);
            }

            _logger.LogInfo("Add Check In End.");
            return result;
        }

        /// <summary>
        /// Get Province
        /// </summary>
        /// <returns> Province </returns>
        [HttpGet]
        [Route("Province")]
        [Authorize]
        public async Task<List<SoProvince>> GetProvince()
        {
            _logger.LogInfo("Get Province Start.");
            var result = new List<SoProvince>();
            try
            {
                result = await _checkInManager.GetProvince();
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
        [HttpPost]
        [Route("Amphur")]
        [Authorize]
        public async Task<List<Amphur>> GetAmphur([FromBody] int provinceId)
        {
            _logger.LogInfo("Get Amphur Start.");
            var result = new List<Amphur>();
            try
            {
                result = await _checkInManager.GetAmphur(provinceId);
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
        [HttpPost]
        [Route("District")]
        [Authorize]
        public async Task<List<District>> GetDistrict([FromBody] int districtId)
        {
            _logger.LogInfo("Get District Start.");
            var result = new List<District>();
            try
            {
                result = await _checkInManager.GetDistrict(districtId);
            }
            catch (Exception ex)
            {
                _logger.LogError("Get District" + ex);
            }

            _logger.LogInfo("Get District End.");
            return result;
        }
        /// <summary>
        /// Get Shop Type
        /// </summary>
        /// <returns> shop type </returns>
        [HttpGet]
        [Route("ShopType")]
        [Authorize]
        public async Task<List<ShopType>> GetShopType()
        {
            _logger.LogInfo("Get Shop Type Start.");
            var result = new List<ShopType>();
            try
            {
                result = await _checkInManager.GetShopType();
            }
            catch (Exception ex)
            {
                _logger.LogError("Get Shop Type" + ex);
            }
            _logger.LogInfo("Get Shop Type End.");
            return result;
        }

        /// <summary>
        /// Get Checkin Histories
        /// </summary>
        /// <param name="userId"></param>
        /// <returns> Checkin History</returns>
        [HttpGet]
        [Route("")]
        [Authorize]
        public async Task<List<CheckinHistory>> GetCheckinHistories(int userId)
        {
            _logger.LogInfo("Get Checkin Histories Start.");
            var result = new List<CheckinHistory>();
            try
            {
                result = await _checkInManager.GetCheckinHistories(userId);
            }
            catch (Exception ex)
            {
                _logger.LogError("Get Checkin Histories" + ex);
            }

            _logger.LogInfo("Get Checkin Histories End.");
            return result;
        }

    }
}
