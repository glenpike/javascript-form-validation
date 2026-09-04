// function to validate name is present
export const isPresent = (value) => !!value?.trim();

const emailRegexp = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*$/i;

export const validEmail = (email) => emailRegexp.test(email);

export const validDate = (date) => !Number.isNaN(Date.parse(date));

// UK landlines start with 01, 02 for geographic locations; 03, 08, 09 for non-geographic; 05 is corporate
// https://www.ofcom.org.uk/phones-and-broadband/phone-numbers/numbering-data
export const validUKPhoneNumber = (tel) => {
  if(!tel) {
    return false
  }
  const cleaned = tel.replace(/[\s\-\(\)]/g, '');

  const ukRegex = /^(?:(?:\+44|44|0044)?0?)7\d{9}$|^(?:(?:\+44|44|0044)?0?)[123589]\d{8,9}$/;

  return ukRegex.test(cleaned);
}