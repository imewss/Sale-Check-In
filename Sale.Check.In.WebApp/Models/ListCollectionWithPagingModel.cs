using System.Collections.Generic;

namespace Sale.Check.In.WebApp.Models
{
    /// <summary>
    /// List collection with paging
    /// </summary>
    /// <typeparam name="T">T is Class of Domain Model</typeparam>
    public class ListCollectionWithPagingModel<T> where T : class
    {
        /// <summary>
        /// Gets or sets the collection.
        /// </summary>
        /// <value>
        /// The collection.
        /// </value>
        public List<T> Collection { get; set; }

        /// <summary>
        /// Gets or sets the index of the page.
        /// </summary>
        /// <value>
        /// The index of the page.
        /// </value>
        public int PageIndex { get; set; }

        /// <summary>
        /// Gets or sets the total page.
        /// </summary>
        /// <value>
        /// The total page.
        /// </value>
        public int TotalPage { get; set; }
    }
}
