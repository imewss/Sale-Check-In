using Microsoft.EntityFrameworkCore;
using Sale.Check.In.WebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Sale.Check.In.WebApp.Extension
{
    public static class ToPagingExtension
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="query"></param>
        /// <param name="keySelector"></param>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <param name="isOrderbyAsc"></param>
        /// <returns></returns>
        public static async Task<ListCollectionCheckInHistoriesModel> ToListCollectionCheckInHistoriesPagingAsync(this IQueryable<CheckinHistory> query, string keySelector, int page, int limit, bool isOrderbyAsc = true)
        {
            var result = new ListCollectionCheckInHistoriesModel();
            result.Collection = new List<CheckinHistory>();
            IQueryable<CheckinHistory> res;
            try
            {

                Expression<Func<CheckinHistory, object>> orderExpression = x => GetPropertyValue(x, keySelector, "createdDate");

                var totalItemCount = await query.CountAsync();

                var totalPage = ((totalItemCount - 1) / limit) + 1;
             
                result.PageIndex = page;
                result.TotalPage = totalPage;
                foreach (var item in query)
                {
                    result.Collection.Add(item);
                }

            }
            catch (Exception ex)
            {

            }

            return result;
        }

        private static object GetPropertyValue(object obj, string name, string defaultProperty)
        {
            try
            {
                return obj.GetType().GetProperty(string.IsNullOrWhiteSpace(name) ? defaultProperty : name).GetValue(obj, null);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
