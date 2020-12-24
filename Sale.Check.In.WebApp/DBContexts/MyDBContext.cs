using Microsoft.EntityFrameworkCore;
using Sale.Check.In.WebApp.Models;

namespace Sale.Check.In.WebApp.DBContexts
{
    public class MyDBContext : DbContext
    {
        public DbSet<SoProvince> SoProvince { get; set; }
        public DbSet<SoUser> SoUser { get; set; }
        public DbSet<Amphur> Amphur { get; set; }
        public DbSet<District> District { get; set; }
        public DbSet<CheckinHistory> CheckinHistory { get; set; }

        public MyDBContext(DbContextOptions<MyDBContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Use Fluent API to configure  

            // Map entities to tables  
            modelBuilder.Entity<SoProvince>().ToTable("so_province");
            modelBuilder.Entity<SoUser>().ToTable("so_user");
            modelBuilder.Entity<Amphur>().ToTable("tbl_amphur");
            modelBuilder.Entity<District>().ToTable("tbl_district");
            modelBuilder.Entity<CheckinHistory>().ToTable("checkin_history");

            // Configure Primary Keys  
            modelBuilder.Entity<SoProvince>().HasKey(ug => ug.P_Id).HasName("P_Id");
            modelBuilder.Entity<SoUser>().HasKey(u => u.U_Id).HasName("U_Id");
            modelBuilder.Entity<Amphur>().HasKey(u => u.Amphur_Id).HasName("Amphur_Id");
            modelBuilder.Entity<District>().HasKey(u => u.District_Id).HasName("District_Id");
            modelBuilder.Entity<CheckinHistory>().HasKey(u => u.Checkin_history_Id).HasName("Checkin_history_Id");

            //// Configure indexes  
            //modelBuilder.Entity<UserGroup>().HasIndex(p => p.Name).IsUnique().HasDatabaseName("Idx_Name");
            //modelBuilder.Entity<User>().HasIndex(u => u.FirstName).HasDatabaseName("Idx_FirstName");
            //modelBuilder.Entity<User>().HasIndex(u => u.LastName).HasDatabaseName("Idx_LastName");

            //// Configure columns  
            //modelBuilder.Entity<UserGroup>().Property(ug => ug.Id).HasColumnType("int").UseMySqlIdentityColumn().IsRequired();
            //modelBuilder.Entity<UserGroup>().Property(ug => ug.Name).HasColumnType("nvarchar(100)").IsRequired();
            //modelBuilder.Entity<UserGroup>().Property(ug => ug.CreationDateTime).HasColumnType("datetime").IsRequired();
            //modelBuilder.Entity<UserGroup>().Property(ug => ug.LastUpdateDateTime).HasColumnType("datetime").IsRequired(false);

            //modelBuilder.Entity<User>().Property(u => u.Id).HasColumnType("int").UseMySqlIdentityColumn().IsRequired();
            //modelBuilder.Entity<User>().Property(u => u.FirstName).HasColumnType("nvarchar(50)").IsRequired();
            //modelBuilder.Entity<User>().Property(u => u.LastName).HasColumnType("nvarchar(50)").IsRequired();
            //modelBuilder.Entity<User>().Property(u => u.UserGroupId).HasColumnType("int").IsRequired();
            //modelBuilder.Entity<User>().Property(u => u.CreationDateTime).HasColumnType("datetime").IsRequired();
            //modelBuilder.Entity<User>().Property(u => u.LastUpdateDateTime).HasColumnType("datetime").IsRequired(false);

            //// Configure relationships  
            //modelBuilder.Entity<User>().HasOne<UserGroup>().WithMany().HasPrincipalKey(ug => ug.Id).HasForeignKey(u => u.UserGroupId).OnDelete(DeleteBehavior.NoAction).HasConstraintName("FK_Users_UserGroups");
        }
    }
}
