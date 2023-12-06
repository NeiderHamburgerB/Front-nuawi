const Footer = () => {
  return (
    <footer className='footer p-10 bg-gray-900 container mx-auto rounded-b-lg border-t border-blue-900 border-dashed lg:max-w-4xl'>
      <p className='text-center text-blue-600 text-sm'>
        &copy; {new Date().getFullYear()} BAQ All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
