namespace Sale.Check.In.WebApp.Models
{
    /// <summary>
    /// Check In model
    /// </summary>
    public class CheckInModel
    {
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string ShopName { get; set; }
        public string ShopType { get; set; }
        public string CustomerType { get; set; }
        public string Province { get; set; }
        public string Amphur { get; set; }
        public string District { get; set; }
        public string ReportType { get; set; }
        public string Note { get; set; }
        public string ReceiptFile { get; set; }
        public string MimeType { get; set; }
        public int UserId { get; set; }
    }
}
