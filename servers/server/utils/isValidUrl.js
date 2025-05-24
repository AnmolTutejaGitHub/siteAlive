function isValidURL(input) {
    try {
      const url = new URL(input.trim());
      const isHttp = url.protocol === 'http:' || url.protocol === 'https:';
      if (!isHttp) return false;
  
      return {
        valid: true,
        domain: url.hostname 
      };
    } catch {
      return {
        valid: false,
        domain: null
      };
    }
  }
  
  module.exports = isValidURL;