using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RealGadget.Models
{
    public class Category
    {
        [Required]
        [Key]
        public int CategoryID { get; set; }
        public string Name { get; set; }

        public List<Gadget> Gadgets { get; set; }
    }
}