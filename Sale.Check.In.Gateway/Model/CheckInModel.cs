namespace Sale.Check.In.Gateway.Model
{
    /// <summary>
    /// Check In model
    /// </summary>
    public class CheckInModel
    {
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public string ShopName { get; set; }
        public string ShopType { get; set; }
        public string CustomerType { get; set; }
        public string Province { get; set; }
        public string District { get; set; }
        public string SubDistrict { get; set; }
        public string ReportType { get; set; }
        public string Note { get; set; }
        public string ReceiptFile { get; set; }
        public string MimeType { get; set; }
    }
}
