import { useRouter } from 'next/router';
import Image from 'next/image';
import wialon2 from '../../public/gig.png';

import wialonLogin1 from '../../public/wialonLogin1.jpg';
import wialonDecoration from '../../public/auth-decoration.png';
import { setCookie } from 'nookies';

export default function Login() {
  const router = useRouter();
  // Wialon site dns
  var dns = 'https://hosting.wialon.com';

  // Main function
  function getToken() {
    // construct login page URL
    var url = dns + '/login.html'; // your site DNS + "/login.html"
    url += '?client_id=' + 'App'; // your application name
    url += '&access_type=' + 0x100; // access level, 0x100 = "Online tracking only"
    url += '&activation_time=' + 0; // activation time, 0 = immediately; you can pass any UNIX time value
    url += '&duration=' + 604800; // duration, 604800 = one week in seconds
    url += '&flags=' + 0x1; // options, 0x1 = add username in response

    url += '&redirect_uri=' + dns + '/post_token.html'; // if login succeed - redirect to this page

    // listen message with token from login page window
    window.addEventListener('message', tokenRecieved);

    // finally, open login page in new window
    window.open(url, '_blank', 'width=760, height=500, top=300, left=500');
  }

  // Help function
  function tokenRecieved(e) {
    // get message from login window
    var msg = e.data;
    if (typeof msg == 'string' && msg.indexOf('access_token=') >= 0) {
      // get token
      var token = msg.replace('access_token=', '');

      // now we can use token, e.g show it on page
      console.log('Access Token ', token);

      // save token in cookies
      localStorage.setItem('accessToken', token);
      setCookie(null, 'accessToken', token, { path: '/' });

      // remove "message" event listener
      window.removeEventListener('message', tokenRecieved);
      router.push('/');
    }
  }
  return (
    <main class='bg-white'>
      <div class='relative flex'>
        <div class='w-full md:w-1/2'>
          <div class='min-h-screen h-full flex flex-col after:flex-1'>
            <div class='flex-1'>
              <div class='flex items-center justify-between mt-8 h-16 px-4 sm:px-6 lg:px-8'>
                <a class='block' href='index.html'>
                  <Image
                    src={wialon2}
                    width={200}
                    height={200}
                    alt='wialon-logo'
                  />
                </a>
              </div>
            </div>

            <div class='w-[320px] lg:w-[520px] mx-auto px-4 py-2'>
              <h1 class='text-3xl text-slate-800 font-bold mb-6'>
                Welcome back! ✨
              </h1>
              <form>
                <div class='space-y-2'>
                  <div>
                    <a
                      class='btn w-full bg-indigo-500 hover:bg-indigo-600 text-white ml-3'
                      onClick={() => getToken()}>
                      Sign In
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          class='hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2'
          aria-hidden='true'>
          <Image
            className='object-cover object-center w-full h-full'
            src={wialonLogin1}
            width={860}
            height={860}
            alt='wialon-login'
          />
          <Image
            className='absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block'
            src={wialonDecoration}
            width={218}
            height={224}
            alt='auth-decoration'
          />
        </div>
      </div>
    </main>
  );
}
