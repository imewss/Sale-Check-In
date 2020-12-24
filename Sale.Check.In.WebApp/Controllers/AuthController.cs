﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Sale.Check.In.WebApp.Interface;
using Sale.Check.In.WebApp.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Sale.Check.In.WebApp.Controllers
{
    /// <summary>
    /// Auth Controller
    /// </summary>
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly ILoggerService _logger;
        private readonly IUserManager _userManager;

        /// <summary>
        /// Auth controller
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="userManager"></param>
        public AuthController(ILoggerService logger, IUserManager userManager)
        {
            _logger = logger;
            _userManager = userManager;
        }

        /// <summary>
        /// Check Login User
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns> if user exist </returns>
        [HttpPost, Route("login")]
        [EnableCors("AllowOrigin")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            _logger.LogInfo("Check Login User Start.");
           
            if (loginModel == null)
                return BadRequest("Invalid client request");

            var result = await _userManager.CheckLoginUser(loginModel);
            var userId = await _userManager.GetUserId(loginModel);
            if (result)
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var signigCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var tokenOptions = new JwtSecurityToken(
                    issuer: "https://localhost:44388",
                    audience: "https://localhost:44388",
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddHours(1),
                    signingCredentials: signigCredentials
                    );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                return Ok(new { Token = tokenString, UserId = userId });
            }

            _logger.LogInfo("Check Login User End.");

            return NotFound();
        }
    }
}
