using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace RealGadget.Models
{
    public class GadgetOrder
    {
        public int GadgetOrderID { get; set; }

        public int OrderID { get; set; }
        public Order Order { get; set; }

        public int GadgetID { get; set; }
        
        public Gadget Gadget { get; set; }
    }
}