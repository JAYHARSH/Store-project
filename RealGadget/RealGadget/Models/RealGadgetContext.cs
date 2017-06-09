using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using static RealGadget.Models.RealGadgetContext;

namespace RealGadget.Models
{
    public class RealGadgetContext : IdentityDbContext<ApplicationUser>
    {

        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
        


        public RealGadgetContext() : base("name=RealGadgetContext")
        {
        }
     
        public static RealGadgetContext Create()
        {
            return new RealGadgetContext();
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Gadget> Gadgets { get; set; }

        public DbSet<GadgetOrder> GadgetOrders { get; set; }
        public DbSet<Order> Orders { get; set; }

        internal class ApplicationUser
        {
        }
    }
}
