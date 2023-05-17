import Kavenegar from 'kavenegar';

const handler = async (req, res) => {
  // var api = Kavenegar.KavenegarApi({
  //   apikey: process.env.KAVENEGAR_API_KEY,
  // });
  // api.Send(
  //   {
  //     message: 'خدمات پیام کوتاه کاوه نگار',
  //     sender: '10008663',
  //     receptor: '09046424513',
  //   },
  //   function (response, status) {
  //     console.log(response);
  //     console.log(status);
  //   }
  // );

  var api = Kavenegar.KavenegarApi({
    apikey: process.env.KAVENEGAR_API_KEY,
  });
  api.VerifyLookup(
    {
      // receptor: '09046424513',
      receptor: req.mobile,
      token: '12345',
      template: 'registerverify',
    },
    function (response, status) {
      // console.log(response);
      // console.log(status);
      res.status(status).send(response);
    }
  );
};
export default handler;

/*
sample output
{
    "return":
    {
        "status":200,
        "message":"تایید شد"
    },
    "entries": {
            "messageid":8792343,
			"message": "ممنون از ثبت نام شما کد تایید عضویت  : 852596",
            "status":5,
            "statustext":"ارسال به مخابرات",
            "sender":"10004346",
            "receptor":"09361234567",
            "date":1356619709,
            "cost":120
   }    
    
}
*/
