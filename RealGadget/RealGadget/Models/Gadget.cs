using System.ComponentModel.DataAnnotations.Schema;

namespace RealGadget.Models
{
    public class Gadget
    {
        public int GadgetID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public byte[] Image { get; set; }

        public int CategoryID { get; set; }
      
        public  Category Category { get; set; }
    }
}