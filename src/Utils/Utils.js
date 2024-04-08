import { destroyCookie, parseCookies, setCookie } from "nookies";
import ShowToast from "../Toaster/Toaster";
import dayjs from "dayjs";
import useCommonStore from "@/Store/useCommonStore";
import useEventStore from "@/Store/useEventStore";
import useUserStore from "@/Store/useUserStore";
import useCategoryMatrixStore from "@/Store/useCategoryMatrixStore";
import copy from "copy-to-clipboard";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

function resetAllStores() {
  useCommonStore.setState((state) => ({
    isLoading: false,
    navigateTo: "",
    token: "",
  }));
  useEventStore.setState((state) => ({
    event: {},
    mapData: {},
    isEditEvent: false,
    eventForm: {},
    questions: [],
    createEventSetting: {},
    colorNFont: { color: "", font: "" },
    integrationSetting: {},
    eventEmailSetting: [],
    isEventUpdated: true,
  }));
  useUserStore.setState((state) => ({
    user: {},
    isPasswordSet: false,
    prevLocation: "",
  }));
  useCategoryMatrixStore.setState((state) => ({
    categories: [],
    selectedCategory: {},
    categoryFields: [],
    guestsList: [],
    guestCount: {},
    categoryFormData: {},
  }));
}

const Utils = {
  isValidEmail: (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern?.test(email);
  },

  goTo: (path) => (window.location.href = path),

  isValidPassword: (pass) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/.test(
      pass
    );
  },

  isValidPhone: (phone) => {
    return phone?.length > 5 && phone?.length < 16;
  },

  convertToValidUrl: (url) => url.replace(/\\\//g, "/"),

  otpPlaceholder: (otpLength) => {
    let inputBox = [];
    for (let i = 0; i < otpLength; i++) {
      inputBox.push("0");
    }
    return inputBox.toString().replace(/,/g, "");
  },

  onChangeInputData: (event, data) => {
    const { name, value } = event.target;
    let transformedValue = value;
    if (typeof value === "string") {
      transformedValue = value.trimStart().replace(/\s+/g, " ");
    }
    if (name === "email") {
      transformedValue = value.trim();
    } else if (
      name === "phone" ||
      name === "age" ||
      name === "capacity" ||
      name === "min_qty" ||
      name === "max_qty"
    ) {
      transformedValue = value.replace(/\D/g, "");
    }
    return {
      ...data,
      [name]: transformedValue,
    };
  },

  sliceArray: (
    from = "",
    to = "",
    dataTobeSliced = [],
    ReturnedData = null,
    uniqueId = ""
  ) => {
    if (uniqueId) {
      return (
        dataTobeSliced?.length &&
        dataTobeSliced.slice(from, to).map((e) => {
          return <ReturnedData key={e?.[uniqueId]} {...e} />;
        })
      );
    }
  },

  deleteCookies: () => {
    document.cookie = `accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `event_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `tempAccessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/${process.env.NEXT_PUBLIC_BASE_URL?.split('/')?.[0]};`;
    document.cookie = `event_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/${process.env.NEXT_PUBLIC_BASE_URL?.split('/')?.[0]};`;
    document.cookie = `tempAccessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/${process.env.NEXT_PUBLIC_BASE_URL?.split('/')?.[0]};`;
    localStorage.clear();
  },

  deleteAllCookies: () => {
    var cookies = document.cookie.split("; ");
    for (var c = 0; c < cookies.length; c++) {
      var d = window.location.hostname.split(".");
      while (d.length > 0) {
        var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
        var p = location.pathname.split('/');
        document.cookie = cookieBase + '/';
        while (p.length > 0) {
          document.cookie = cookieBase + p.join('/');
          p.pop();
        };
        d.shift();
      }
    }
  },

  expireAllCookies: (name, paths) => {
    var expires = new Date(0).toUTCString();
    // expire null-path cookies as well
    document.cookie = name + '=; expires=' + expires;

    for (var i = 0, l = paths.length; i < l; i++) {
      document.cookie = name + '=; path=' + paths[i] + '; expires=' + expires;
    }
  },

  expireActiveCookies: (name) => {
    var pathname = location.pathname.replace(/\/$/, ''),
      segments = pathname.split('/'),
      paths = [];

    for (var i = 0, l = segments.length, path; i < l; i++) {
      path = segments.slice(0, i + 1).join('/');

      paths.push(path);       // as file
      paths.push(path + '/'); // as directory
    }
    Utils?.expireAllCookies(name, paths);
  },

  afterLogout: async (activateGoTo = true) => {

    Utils?.expireActiveCookies("accessToken");
    Utils?.expireActiveCookies("tempAccessToken");
    Utils?.expireActiveCookies("event_id");

    Utils?.deleteAllCookies();
    Utils?.deleteCookies();
    localStorage.removeItem("accessToken");
    localStorage.clear();
    Utils?.removeCookie("accessToken");
    Utils?.removeCookie("tempAccessToken");
    Utils?.removeCookie("event_id");
    if (activateGoTo) Utils?.goTo(`/${process.env.NEXT_PUBLIC_BASE_URL}`);
    if (activateGoTo) {
      setTimeout(() => {
        resetAllStores();
        Utils?.destroyAllCookies();
      }, 5000);
    } else {
      resetAllStores();
      Utils?.destroyAllCookies();
    }
  },

  isValidUrl: (url) => {
    try {
      return (
        new URL(url)?.protocol === "http:" ||
        new URL(url)?.protocol === "https:"
      );
    } catch (error) {
      return false;
    }
  },

  capitalizeFirstWord: (string) =>
    string?.charAt(0)?.toUpperCase() + string?.slice(1),

  isPastDate: (date = "") => {
    let currentDate = dayjs();
    let pastDate = dayjs(date);
    return pastDate < currentDate;
  },

  isPastDateForCreateEvent: (date = "") => {
    const givenDay = dayjs(date);
    const today = dayjs();
    const onlyGivenDate = givenDay.format("DD/MM/YYYY");
    const onlyTodayDate = today.format("DD/MM/YYYY");
    return onlyGivenDate < onlyTodayDate;
  },

  isPastDateForSession: (date1, date2) => {
    const timestamp1 = new Date(date1).getTime();
    const timestamp2 = new Date(date2).getTime();

    const difference = timestamp1 - timestamp2;

    return -difference;
  },

  isFutureDate: (date = "") => {
    let currentDate = dayjs();
    let futureDate = dayjs(date);
    return futureDate > currentDate;
  },

  copyText: async (
    textToBeCopied = "",
    message = "Text copied successfully!"
  ) => {
    await copy(textToBeCopied, { debug: true });
    ShowToast({ message, variant: "success" });
  },

  manipulateArr: (
    arr = [],
    matchBy = "",
    matchWith = "",
    newField = "",
    newValue = ""
  ) => {
    let tempArr = [];
    arr?.length &&
      arr.map((e) => {
        let obj = { ...e };
        if (obj[matchWith] === matchBy) {
          obj = { ...e, [newField]: newValue };
        }
        tempArr.push(obj);
      });
    return tempArr;
  },

  displayValueFromArray: (arr = [], keyId = "", cond = null) => {
    return arr.map((obj) => {
      if (cond) {
        if (obj[cond]) {
          return obj[keyId];
        }
      } else {
        return obj[keyId];
      }
    });
  },

  removeEmptyValues: (arr = []) => {
    return arr.filter((value) => {
      // Remove empty strings, null, undefined, NaN and false
      return (
        value !== "" &&
        value !== null &&
        value !== undefined &&
        !Number.isNaN(value) &&
        value !== false
      );
    });
  },

  scrollToTop: (refName = null, fromTop = 30) => {
    if (refName?.current) {
      refName?.current?.scrollTo({
        top: fromTop,
        behavior: "smooth",
      });
    }
  },

  isMobile: () =>
    /Android|webOS|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ),

  isiPad: () => /iPad/i.test(navigator.userAgent),

  isDesktop: () => /Windows|Linux|Macintosh/i.test(navigator.userAgent),

  convertDateNTime: (dateTime = new Date()) => {
    if (dateTime) {
      return dayjs(dateTime).format("D MMM, YYYY - HH:mm");
    }
  },

  horizontalScroll: (elem) => {
    if (elem) {
      const scroll = document.querySelector(elem);
      let isDown = false;
      let scrollX;
      let scrollLeft;

      // Mouse Up Function
      scroll.addEventListener("mouseup", () => {
        isDown = false;
        scroll.classList.remove("active");
      });

      // Mouse Leave Function
      scroll.addEventListener("mouseleave", () => {
        isDown = false;
        scroll.classList.remove("active");
      });

      // Mouse Down Function
      scroll.addEventListener("mousedown", (e) => {
        e.preventDefault();
        isDown = true;
        scroll.classList.add("active");
        scrollX = e.pageX - scroll.offsetLeft;
        scrollLeft = scroll.scrollLeft;
      });

      // Mouse Move Function
      scroll.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        let element = e.pageX - scroll.offsetLeft;
        let scrolling = (element - scrollX) * 2;
        scroll.scrollLeft = scrollLeft - scrolling;
      });
      return () => {
        scroll.removeEventListener("mouseup");
        scroll.removeEventListener("mouseleave");
        scroll.removeEventListener("mousedown");
        scroll.removeEventListener("mousemove");
      };
    }
  },

  findLastDigit: (num = 0) => num % 10,

  checkName: (name) => !/^[^a-zA-Z]*$/.test(name),

  checkDescription: (des) => {
    const str = des.substring(des.indexOf(">") + 1);
    return (
      des?.length !== 0 && str[0] !== "&" && str[0] !== " " && str[0] !== "<"
    );
  },

  removeTags: (withTags = "") => withTags?.replace(/<[^>]+>/g, ""),

  hasWhiteSpace: (s) => /\s/g.test(s),

  grabFirstTwoLetters: (str) => {
    if (str)
      return str
        ?.split(" ")
        ?.map((word) => word[0])
        ?.slice(0, 2)
        ?.join("")
        ?.toUpperCase();
  },

  findDeviceType: () => {
    if (Utils?.isDesktop) {
      return "Desktop";
    } else if (Utils?.isiPad) {
      return "Tab";
    } else if (Utils?.isMobile) {
      return "Phone";
    } else {
      return "Unknown";
    }
  },

  getFileExtension: (fileName) => {
    const parts = fileName.split(".");
    if (parts.length > 1) {
      return parts.pop().toLowerCase();
    }
    return "";
  },

  singleFileSize: 4,
  multiFileSize: 50,
  isInputNumber: (num) => /^\d+$/.test(num),

  removeTextContentFromString: (htmlString) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;
    const removeTextContent = (element) => {
      if (element.nodeType === Node.TEXT_NODE) {
        element.textContent = "";
      } else {
        for (let child of element.childNodes) {
          removeTextContent(child);
        }
      }
    };
    removeTextContent(tempElement);
    return tempElement.innerHTML;
  },

  extractClsName: (tag) => {
    let colorArr = [
      { tag: "speaker", color: "BlueLight" },
      { tag: "booth-owner", color: "GreenLight" },
      { tag: "attendee", color: "PinkLight" },
      { tag: "register", color: "PinkLight" },
    ];
    return colorArr?.find((elem) => elem?.tag === tag)?.color;
  },

  recommendedCountry: [
    {
      id: 231,
      sortname: "US",
      dial_code: "+1",
      name: "United States",
      flag_code: "us",
    },
    {
      id: 101,
      sortname: "IN",
      dial_code: "+91",
      name: "India",
      flag_code: "in",
    },
    {
      id: 230,
      sortname: "GB",
      dial_code: "+44",
      name: "United Kingdom",
      flag_code: "gb",
    },
  ],

  hardReloadWithEmptyCache: () => {
    caches.keys().then((cacheNames) => {
      cacheNames.forEach((cacheName) => {
        caches.delete(cacheName);
      });
    });
    window.location.reload(true);
  },

  countryCode: [
    {
      value: "AF#93",
      sortname: "AF",
      label: "+93",
      name: "Afghanistan",
      flag_code: "af",
    },
    {
      value: "AL#355",
      sortname: "AL",
      label: "+355",
      name: "Albania",
      flag_code: "al",
    },
    {
      value: "DZ#213",
      sortname: "DZ",
      label: "+213",
      name: "Algeria",
      flag_code: "dz",
    },
    {
      value: "AS#1-684",
      sortname: "AS",
      label: "+1-684",
      name: "American Samoa",
      flag_code: "as",
    },
    {
      value: "AD#376",
      sortname: "AD",
      label: "+376",
      name: "Andorra",
      flag_code: "ad",
    },
    {
      value: "AO#244",
      sortname: "AO",
      label: "+244",
      name: "Angola",
      flag_code: "ao",
    },
    {
      value: "AI#1-264",
      sortname: "AI",
      label: "+1-264",
      name: "Anguilla",
      flag_code: "ai",
    },
    {
      value: "AQ#672",
      sortname: "AQ",
      label: "+672",
      name: "Antarctica",
      flag_code: "aq",
    },
    {
      value: "AG#1-268",
      sortname: "AG",
      label: "+1-268",
      name: "Antigua And Barbuda",
      flag_code: "ag",
    },
    {
      value: "AR#54",
      sortname: "AR",
      label: "+54",
      name: "Argentina",
      flag_code: "ar",
    },
    {
      value: "AM#374",
      sortname: "AM",
      label: "+374",
      name: "Armenia",
      flag_code: "am",
    },
    {
      value: "AW#297",
      sortname: "AW",
      label: "+297",
      name: "Aruba",
      flag_code: "aw",
    },
    {
      value: "AU#61",
      sortname: "AU",
      label: "+61",
      name: "Australia",
      flag_code: "au",
    },
    {
      value: "AT#43",
      sortname: "AT",
      label: "+43",
      name: "Austria",
      flag_code: "at",
    },
    {
      value: "AZ#994",
      sortname: "AZ",
      label: "+994",
      name: "Azerbaijan",
      flag_code: "az",
    },
    {
      value: "BS#1-242",
      sortname: "BS",
      label: "+1-242",
      name: "Bahamas The",
      flag_code: "bs",
    },
    {
      value: "BH#973",
      sortname: "BH",
      label: "+973",
      name: "Bahrain",
      flag_code: "bh",
    },
    {
      value: "BD#880",
      sortname: "BD",
      label: "+880",
      name: "Bangladesh",
      flag_code: "bd",
    },
    {
      value: "BB#1-246",
      sortname: "BB",
      label: "+1-246",
      name: "Barbados",
      flag_code: "bb",
    },
    {
      value: "BY#375",
      sortname: "BY",
      label: "+375",
      name: "Belarus",
      flag_code: "by",
    },
    {
      value: "BE#32",
      sortname: "BE",
      label: "+32",
      name: "Belgium",
      flag_code: "be",
    },
    {
      value: "BZ#501",
      sortname: "BZ",
      label: "+501",
      name: "Belize",
      flag_code: "bz",
    },
    {
      value: "BJ#229",
      sortname: "BJ",
      label: "+229",
      name: "Benin",
      flag_code: "bj",
    },
    {
      value: "BM#1-441",
      sortname: "BM",
      label: "+1-441",
      name: "Bermuda",
      flag_code: "bm",
    },
    {
      value: "BT#975",
      sortname: "BT",
      label: "+975",
      name: "Bhutan",
      flag_code: "bt",
    },
    {
      value: "BO#591",
      sortname: "BO",
      label: "+591",
      name: "Bolivia",
      flag_code: "bo",
    },
    {
      value: "BA#387",
      sortname: "BA",
      label: "+387",
      name: "Bosnia and Herzegovina",
      flag_code: "ba",
    },
    {
      value: "BW#267",
      sortname: "BW",
      label: "+267",
      name: "Botswana",
      flag_code: "bw",
    },
    {
      value: "BV#47",
      sortname: "BV",
      label: "+47",
      name: "Bouvet Island",
      flag_code: "bv",
    },
    {
      value: "BR#55",
      sortname: "BR",
      label: "+55",
      name: "Brazil",
      flag_code: "br",
    },
    {
      value: "IO#246",
      sortname: "IO",
      label: "+246",
      name: "British Indian Ocean Territory",
      flag_code: "io",
    },
    {
      value: "BN#673",
      sortname: "BN",
      label: "+673",
      name: "Brunei",
      flag_code: "bn",
    },
    {
      value: "BG#359",
      sortname: "BG",
      label: "+359",
      name: "Bulgaria",
      flag_code: "bg",
    },
    {
      value: "BF#226",
      sortname: "BF",
      label: "+226",
      name: "Burkina Faso",
      flag_code: "bf",
    },
    {
      value: "BI#257",
      sortname: "BI",
      label: "+257",
      name: "Burundi",
      flag_code: "bi",
    },
    {
      value: "KH#855",
      sortname: "KH",
      label: "+855",
      name: "Cambodia",
      flag_code: "kh",
    },
    {
      value: "CM#237",
      sortname: "CM",
      label: "+237",
      name: "Cameroon",
      flag_code: "cm",
    },
    {
      value: "CA#1",
      sortname: "CA",
      label: "+1",
      name: "Canada",
      flag_code: "ca",
    },
    {
      value: "CV#238",
      sortname: "CV",
      label: "+238",
      name: "Cape Verde",
      flag_code: "cv",
    },
    {
      value: "KY#1-345",
      sortname: "KY",
      label: "+1-345",
      name: "Cayman Islands",
      flag_code: "ky",
    },
    {
      value: "CF#236",
      sortname: "CF",
      label: "+236",
      name: "Central African Republic",
      flag_code: "cf",
    },
    {
      value: "TD#235",
      sortname: "TD",
      label: "+235",
      name: "Chad",
      flag_code: "td",
    },
    {
      value: "CL#56",
      sortname: "CL",
      label: "+56",
      name: "Chile",
      flag_code: "cl",
    },
    {
      value: "CN#86",
      sortname: "CN",
      label: "+86",
      name: "China",
      flag_code: "cn",
    },
    {
      value: "CX#53",
      sortname: "CX",
      label: "+53",
      name: "Christmas Island",
      flag_code: "cx",
    },
    {
      value: "CC#61",
      sortname: "CC",
      label: "+61",
      name: "Cocos (Keeling) Islands",
      flag_code: "cc",
    },
    {
      value: "CO#57",
      sortname: "CO",
      label: "+57",
      name: "Colombia",
      flag_code: "co",
    },
    {
      value: "KM#269",
      sortname: "KM",
      label: "+269",
      name: "Comoros",
      flag_code: "km",
    },
    {
      value: "CG#242",
      sortname: "CG",
      label: "+242",
      name: "Congo",
      flag_code: "cg",
    },
    {
      value: "CD#243",
      sortname: "CD",
      label: "+243",
      name: "Congo The Democratic Republic Of The",
      flag_code: "cd",
    },
    {
      value: "CK#682",
      sortname: "CK",
      label: "+682",
      name: "Cook Islands",
      flag_code: "ck",
    },
    {
      value: "CR#506",
      sortname: "CR",
      label: "+506",
      name: "Costa Rica",
      flag_code: "cr",
    },
    {
      value: "CI#225",
      sortname: "CI",
      label: "+225",
      name: "Cote D'Ivoire (Ivory Coast)",
      flag_code: "ci",
    },
    {
      value: "HR#385",
      sortname: "HR",
      label: "+385",
      name: "Croatia (Hrvatska)",
      flag_code: "hr",
    },
    {
      value: "CU#53",
      sortname: "CU",
      label: "+53",
      name: "Cuba",
      flag_code: "cu",
    },
    {
      value: "CY#357",
      sortname: "CY",
      label: "+357",
      name: "Cyprus",
      flag_code: "cy",
    },
    {
      value: "CZ#420",
      sortname: "CZ",
      label: "+420",
      name: "Czech Republic",
      flag_code: "cz",
    },
    {
      value: "DK#45",
      sortname: "DK",
      label: "+45",
      name: "Denmark",
      flag_code: "dk",
    },
    {
      value: "DJ#253",
      sortname: "DJ",
      label: "+253",
      name: "Djibouti",
      flag_code: "dj",
    },
    {
      value: "DM#1-767",
      sortname: "DM",
      label: "+1-767",
      name: "Dominica",
      flag_code: "dm",
    },
    {
      value: "DO#1-809",
      sortname: "DO",
      label: "+1-809",
      name: "Dominican Republic",
      flag_code: "do",
    },
    {
      value: "TP#670",
      sortname: "TP",
      label: "+670",
      name: "East Timor",
      flag_code: "tp",
    },
    {
      value: "EC#593",
      sortname: "EC",
      label: "+593",
      name: "Ecuador",
      flag_code: "ec",
    },
    {
      value: "EG#20",
      sortname: "EG",
      label: "+20",
      name: "Egypt",
      flag_code: "eg",
    },
    {
      value: "SV#503",
      sortname: "SV",
      label: "+503",
      name: "El Salvador",
      flag_code: "sv",
    },
    {
      value: "GQ#240",
      sortname: "GQ",
      label: "+240",
      name: "Equatorial Guinea",
      flag_code: "gq",
    },
    {
      value: "ER#291",
      sortname: "ER",
      label: "+291",
      name: "Eritrea",
      flag_code: "er",
    },
    {
      value: "EE#372",
      sortname: "EE",
      label: "+372",
      name: "Estonia",
      flag_code: "ee",
    },
    {
      value: "ET#251",
      sortname: "ET",
      label: "+251",
      name: "Ethiopia",
      flag_code: "et",
    },
    {
      value: "XA#672",
      sortname: "XA",
      label: "+672",
      name: "External Territories of Australia",
      flag_code: "xa",
    },
    {
      value: "FK#500",
      sortname: "FK",
      label: "+500",
      name: "Falkland Islands",
      flag_code: "fk",
    },
    {
      value: "FO#298",
      sortname: "FO",
      label: "+298",
      name: "Faroe Islands",
      flag_code: "fo",
    },
    {
      value: "FJ#679",
      sortname: "FJ",
      label: "+679",
      name: "Fiji Islands",
      flag_code: "fj",
    },
    {
      value: "FI#358",
      sortname: "FI",
      label: "+358",
      name: "Finland",
      flag_code: "fi",
    },
    {
      value: "FR#33",
      sortname: "FR",
      label: "+33",
      name: "France",
      flag_code: "fr",
    },
    {
      value: "GF#594",
      sortname: "GF",
      label: "+594",
      name: "French Guiana",
      flag_code: "gf",
    },
    {
      value: "PF#689",
      sortname: "PF",
      label: "+689",
      name: "French Polynesia",
      flag_code: "pf",
    },
    {
      value: "TF#262",
      sortname: "TF",
      label: "+262",
      name: "French Southern Territories",
      flag_code: "tf",
    },
    {
      value: "GA#241",
      sortname: "GA",
      label: "+241",
      name: "Gabon",
      flag_code: "ga",
    },
    {
      value: "GM#220",
      sortname: "GM",
      label: "+220",
      name: "Gambia The",
      flag_code: "gm",
    },
    {
      value: "GE#995",
      sortname: "GE",
      label: "+995",
      name: "Georgia",
      flag_code: "ge",
    },
    {
      value: "DE#49",
      sortname: "DE",
      label: "+49",
      name: "Germany",
      flag_code: "de",
    },
    {
      value: "GH#233",
      sortname: "GH",
      label: "+233",
      name: "Ghana",
      flag_code: "gh",
    },
    {
      value: "GI#350",
      sortname: "GI",
      label: "+350",
      name: "Gibraltar",
      flag_code: "gi",
    },
    {
      value: "GR#30",
      sortname: "GR",
      label: "+30",
      name: "Greece",
      flag_code: "gr",
    },
    {
      value: "GL#299",
      sortname: "GL",
      label: "+299",
      name: "Greenland",
      flag_code: "gl",
    },
    {
      value: "GD#1-473",
      sortname: "GD",
      label: "+1-473",
      name: "Grenada",
      flag_code: "gd",
    },
    {
      value: "GP#590",
      sortname: "GP",
      label: "+590",
      name: "Guadeloupe",
      flag_code: "gp",
    },
    {
      value: "GU#1-671",
      sortname: "GU",
      label: "+1-671",
      name: "Guam",
      flag_code: "gu",
    },
    {
      value: "GT#502",
      sortname: "GT",
      label: "+502",
      name: "Guatemala",
      flag_code: "gt",
    },
    {
      value: "XU#44",
      sortname: "XU",
      label: "+44",
      name: "Guernsey and Alderney",
      flag_code: "xu",
    },
    {
      value: "GN#224",
      sortname: "GN",
      label: "+224",
      name: "Guinea",
      flag_code: "gn",
    },
    {
      value: "GW#245",
      sortname: "GW",
      label: "+245",
      name: "Guinea-Bissau",
      flag_code: "gw",
    },
    {
      value: "GY#592",
      sortname: "GY",
      label: "+592",
      name: "Guyana",
      flag_code: "gy",
    },
    {
      value: "HT#509",
      sortname: "HT",
      label: "+509",
      name: "Haiti",
      flag_code: "ht",
    },
    {
      value: "HM#1",
      sortname: "HM",
      label: "+1",
      name: "Heard and McDonald Islands",
      flag_code: "hm",
    },
    {
      value: "HN#504",
      sortname: "HN",
      label: "+504",
      name: "Honduras",
      flag_code: "hn",
    },
    {
      value: "HK#852",
      sortname: "HK",
      label: "+852",
      name: "Hong Kong S.A.R.",
      flag_code: "hk",
    },
    {
      value: "HU#36",
      sortname: "HU",
      label: "+36",
      name: "Hungary",
      flag_code: "hu",
    },
    {
      value: "IS#354",
      sortname: "IS",
      label: "+354",
      name: "Iceland",
      flag_code: "is",
    },
    {
      value: "IN#91",
      sortname: "IN",
      label: "+91",
      name: "India",
      flag_code: "in",
    },
    {
      value: "ID#62",
      sortname: "ID",
      label: "+62",
      name: "Indonesia",
      flag_code: "id",
    },
    {
      value: "IR#98",
      sortname: "IR",
      label: "+98",
      name: "Iran",
      flag_code: "ir",
    },
    {
      value: "IQ#964",
      sortname: "IQ",
      label: "+964",
      name: "Iraq",
      flag_code: "iq",
    },
    {
      value: "IE#353",
      sortname: "IE",
      label: "+353",
      name: "Ireland",
      flag_code: "ie",
    },
    {
      value: "IL#972",
      sortname: "IL",
      label: "+972",
      name: "Israel",
      flag_code: "il",
    },
    {
      value: "IT#39",
      sortname: "IT",
      label: "+39",
      name: "Italy",
      flag_code: "it",
    },
    {
      value: "JM#1-876",
      sortname: "JM",
      label: "+1-876",
      name: "Jamaica",
      flag_code: "jm",
    },
    {
      value: "JP#81",
      sortname: "JP",
      label: "+81",
      name: "Japan",
      flag_code: "jp",
    },
    {
      value: "XJ#44",
      sortname: "XJ",
      label: "+44",
      name: "Jersey",
      flag_code: "xj",
    },
    {
      value: "JO#962",
      sortname: "JO",
      label: "+962",
      name: "Jordan",
      flag_code: "jo",
    },
    {
      value: "KZ#7",
      sortname: "KZ",
      label: "+7",
      name: "Kazakhstan",
      flag_code: "kz",
    },
    {
      value: "KE#254",
      sortname: "KE",
      label: "+254",
      name: "Kenya",
      flag_code: "ke",
    },
    {
      value: "KI#686",
      sortname: "KI",
      label: "+686",
      name: "Kiribati",
      flag_code: "ki",
    },
    {
      value: "KP#850",
      sortname: "KP",
      label: "+850",
      name: "Korea North",
      flag_code: "kp",
    },
    {
      value: "KR#82",
      sortname: "KR",
      label: "+82",
      name: "Korea South",
      flag_code: "kr",
    },
    {
      value: "KW#965",
      sortname: "KW",
      label: "+965",
      name: "Kuwait",
      flag_code: "kw",
    },
    {
      value: "KG#996",
      sortname: "KG",
      label: "+996",
      name: "Kyrgyzstan",
      flag_code: "kg",
    },
    {
      value: "LA#856",
      sortname: "LA",
      label: "+856",
      name: "Laos",
      flag_code: "la",
    },
    {
      value: "LV#371",
      sortname: "LV",
      label: "+371",
      name: "Latvia",
      flag_code: "lv",
    },
    {
      value: "LB#961",
      sortname: "LB",
      label: "+961",
      name: "Lebanon",
      flag_code: "lb",
    },
    {
      value: "LS#266",
      sortname: "LS",
      label: "+266",
      name: "Lesotho",
      flag_code: "ls",
    },
    {
      value: "LR#231",
      sortname: "LR",
      label: "+231",
      name: "Liberia",
      flag_code: "lr",
    },
    {
      value: "LY#218",
      sortname: "LY",
      label: "+218",
      name: "Libya",
      flag_code: "ly",
    },
    {
      value: "LI#423",
      sortname: "LI",
      label: "+423",
      name: "Liechtenstein",
      flag_code: "li",
    },
    {
      value: "LT#370",
      sortname: "LT",
      label: "+370",
      name: "Lithuania",
      flag_code: "lt",
    },
    {
      value: "LU#352",
      sortname: "LU",
      label: "+352",
      name: "Luxembourg",
      flag_code: "lu",
    },
    {
      value: "MO#853",
      sortname: "MO",
      label: "+853",
      name: "Macau S.A.R.",
      flag_code: "mo",
    },
    {
      value: "MK#389",
      sortname: "MK",
      label: "+389",
      name: "Macedonia",
      flag_code: "mk",
    },
    {
      value: "MG#261",
      sortname: "MG",
      label: "+261",
      name: "Madagascar",
      flag_code: "mg",
    },
    {
      value: "MW#265",
      sortname: "MW",
      label: "+265",
      name: "Malawi",
      flag_code: "mw",
    },
    {
      value: "MY#60",
      sortname: "MY",
      label: "+60",
      name: "Malaysia",
      flag_code: "my",
    },
    {
      value: "MV#960",
      sortname: "MV",
      label: "+960",
      name: "Maldives",
      flag_code: "mv",
    },
    {
      value: "ML#223",
      sortname: "ML",
      label: "+223",
      name: "Mali",
      flag_code: "ml",
    },
    {
      value: "MT#356",
      sortname: "MT",
      label: "+356",
      name: "Malta",
      flag_code: "mt",
    },
    {
      value: "XM#44",
      sortname: "XM",
      label: "+44",
      name: "Man (Isle of)",
      flag_code: "xm",
    },
    {
      value: "MH#692",
      sortname: "MH",
      label: "+692",
      name: "Marshall Islands",
      flag_code: "mh",
    },
    {
      value: "MQ#596",
      sortname: "MQ",
      label: "+596",
      name: "Martinique",
      flag_code: "mq",
    },
    {
      value: "MR#222",
      sortname: "MR",
      label: "+222",
      name: "Mauritania",
      flag_code: "mr",
    },
    {
      value: "MU#230",
      sortname: "MU",
      label: "+230",
      name: "Mauritius",
      flag_code: "mu",
    },
    {
      value: "YT#269",
      sortname: "YT",
      label: "+269",
      name: "Mayotte",
      flag_code: "yt",
    },
    {
      value: "MX#52",
      sortname: "MX",
      label: "+52",
      name: "Mexico",
      flag_code: "mx",
    },
    {
      value: "FM#691",
      sortname: "FM",
      label: "+691",
      name: "Micronesia",
      flag_code: "fm",
    },
    {
      value: "MD#373",
      sortname: "MD",
      label: "+373",
      name: "Moldova",
      flag_code: "md",
    },
    {
      value: "MC#377",
      sortname: "MC",
      label: "+377",
      name: "Monaco",
      flag_code: "mc",
    },
    {
      value: "MN#976",
      sortname: "MN",
      label: "+976",
      name: "Mongolia",
      flag_code: "mn",
    },
    {
      value: "MS#1-664",
      sortname: "MS",
      label: "+1-664",
      name: "Montserrat",
      flag_code: "ms",
    },
    {
      value: "MA#212",
      sortname: "MA",
      label: "+212",
      name: "Morocco",
      flag_code: "ma",
    },
    {
      value: "MZ#258",
      sortname: "MZ",
      label: "+258",
      name: "Mozambique",
      flag_code: "mz",
    },
    {
      value: "MM#95",
      sortname: "MM",
      label: "+95",
      name: "Myanmar",
      flag_code: "mm",
    },
    {
      value: "NA#264",
      sortname: "NA",
      label: "+264",
      name: "Namibia",
      flag_code: "na",
    },
    {
      value: "NR#674",
      sortname: "NR",
      label: "+674",
      name: "Nauru",
      flag_code: "nr",
    },
    {
      value: "NP#977",
      sortname: "NP",
      label: "+977",
      name: "Nepal",
      flag_code: "np",
    },
    {
      value: "AN#599",
      sortname: "AN",
      label: "+599",
      name: "Netherlands Antilles",
      flag_code: "an",
    },
    {
      value: "NL#31",
      sortname: "NL",
      label: "+31",
      name: "Netherlands The",
      flag_code: "nl",
    },
    {
      value: "NC#687",
      sortname: "NC",
      label: "+687",
      name: "New Caledonia",
      flag_code: "nc",
    },
    {
      value: "NZ#64",
      sortname: "NZ",
      label: "+64",
      name: "New Zealand",
      flag_code: "nz",
    },
    {
      value: "NI#505",
      sortname: "NI",
      label: "+505",
      name: "Nicaragua",
      flag_code: "ni",
    },
    {
      value: "NE#227",
      sortname: "NE",
      label: "+227",
      name: "Niger",
      flag_code: "ne",
    },
    {
      value: "NG#234",
      sortname: "NG",
      label: "+234",
      name: "Nigeria",
      flag_code: "ng",
    },
    {
      value: "NU#683",
      sortname: "NU",
      label: "+683",
      name: "Niue",
      flag_code: "nu",
    },
    {
      value: "NF#672",
      sortname: "NF",
      label: "+672",
      name: "Norfolk Island",
      flag_code: "nf",
    },
    {
      value: "MP#1-670",
      sortname: "MP",
      label: "+1-670",
      name: "Northern Mariana Islands",
      flag_code: "mp",
    },
    {
      value: "NO#47",
      sortname: "NO",
      label: "+47",
      name: "Norway",
      flag_code: "no",
    },
    {
      value: "OM#968",
      sortname: "OM",
      label: "+968",
      name: "Oman",
      flag_code: "om",
    },
    {
      value: "PK#92",
      sortname: "PK",
      label: "+92",
      name: "Pakistan",
      flag_code: "pk",
    },
    {
      value: "PW#680",
      sortname: "PW",
      label: "+680",
      name: "Palau",
      flag_code: "pw",
    },
    {
      value: "PS#970",
      sortname: "PS",
      label: "+970",
      name: "Palestinian Territory Occupied",
      flag_code: "ps",
    },
    {
      value: "PA#507",
      sortname: "PA",
      label: "+507",
      name: "Panama",
      flag_code: "pa",
    },
    {
      value: "PG#675",
      sortname: "PG",
      label: "+675",
      name: "Papua new Guinea",
      flag_code: "pg",
    },
    {
      value: "PY#595",
      sortname: "PY",
      label: "+595",
      name: "Paraguay",
      flag_code: "py",
    },
    {
      value: "PE#51",
      sortname: "PE",
      label: "+51",
      name: "Peru",
      flag_code: "pe",
    },
    {
      value: "PH#63",
      sortname: "PH",
      label: "+63",
      name: "Philippines",
      flag_code: "ph",
    },
    {
      value: "PN#64",
      sortname: "PN",
      label: "+64",
      name: "Pitcairn Island",
      flag_code: "pn",
    },
    {
      value: "PL#48",
      sortname: "PL",
      label: "+48",
      name: "Poland",
      flag_code: "pl",
    },
    {
      value: "PT#351",
      sortname: "PT",
      label: "+351",
      name: "Portugal",
      flag_code: "pt",
    },
    {
      value: "PR#1-787",
      sortname: "PR",
      label: "+1-787",
      name: "Puerto Rico",
      flag_code: "pr",
    },
    {
      value: "QA#974",
      sortname: "QA",
      label: "+974",
      name: "Qatar",
      flag_code: "qa",
    },
    {
      value: "RE#262",
      sortname: "RE",
      label: "+262",
      name: "Reunion",
      flag_code: "re",
    },
    {
      value: "RO#40",
      sortname: "RO",
      label: "+40",
      name: "Romania",
      flag_code: "ro",
    },
    {
      value: "RU#7",
      sortname: "RU",
      label: "+7",
      name: "Russia",
      flag_code: "ru",
    },
    {
      value: "RW#250",
      sortname: "RW",
      label: "+250",
      name: "Rwanda",
      flag_code: "rw",
    },
    {
      value: "SH#290",
      sortname: "SH",
      label: "+290",
      name: "Saint Helena",
      flag_code: "sh",
    },
    {
      value: "KN#1-869",
      sortname: "KN",
      label: "+1-869",
      name: "Saint Kitts And Nevis",
      flag_code: "kn",
    },
    {
      value: "LC#1-758",
      sortname: "LC",
      label: "+1-758",
      name: "Saint Lucia",
      flag_code: "lc",
    },
    {
      value: "PM#508",
      sortname: "PM",
      label: "+508",
      name: "Saint Pierre and Miquelon",
      flag_code: "pm",
    },
    {
      value: "VC#1-784",
      sortname: "VC",
      label: "+1-784",
      name: "Saint Vincent And The Grenadines",
      flag_code: "vc",
    },
    {
      value: "WS#685",
      sortname: "WS",
      label: "+685",
      name: "Samoa",
      flag_code: "ws",
    },
    {
      value: "SM#378",
      sortname: "SM",
      label: "+378",
      name: "San Marino",
      flag_code: "sm",
    },
    {
      value: "ST#239",
      sortname: "ST",
      label: "+239",
      name: "Sao Tome and Principe",
      flag_code: "st",
    },
    {
      value: "SA#966",
      sortname: "SA",
      label: "+966",
      name: "Saudi Arabia",
      flag_code: "sa",
    },
    {
      value: "SN#221",
      sortname: "SN",
      label: "+221",
      name: "Senegal",
      flag_code: "sn",
    },
    {
      value: "RS#381",
      sortname: "RS",
      label: "+381",
      name: "Serbia",
      flag_code: "rs",
    },
    {
      value: "SC#248",
      sortname: "SC",
      label: "+248",
      name: "Seychelles",
      flag_code: "sc",
    },
    {
      value: "SL#232",
      sortname: "SL",
      label: "+232",
      name: "Sierra Leone",
      flag_code: "sl",
    },
    {
      value: "SG#65",
      sortname: "SG",
      label: "+65",
      name: "Singapore",
      flag_code: "sg",
    },
    {
      value: "SK#421",
      sortname: "SK",
      label: "+421",
      name: "Slovakia",
      flag_code: "sk",
    },
    {
      value: "SI#386",
      sortname: "SI",
      label: "+386",
      name: "Slovenia",
      flag_code: "si",
    },
    {
      value: "XG#44",
      sortname: "XG",
      label: "+44",
      name: "Smaller Territories of the UK",
      flag_code: "xg",
    },
    {
      value: "SB#677",
      sortname: "SB",
      label: "+677",
      name: "Solomon Islands",
      flag_code: "sb",
    },
    {
      value: "SO#252",
      sortname: "SO",
      label: "+252",
      name: "Somalia",
      flag_code: "so",
    },
    {
      value: "ZA#27",
      sortname: "ZA",
      label: "+27",
      name: "South Africa",
      flag_code: "za",
    },
    {
      value: "GS#500",
      sortname: "GS",
      label: "+500",
      name: "South Georgia",
      flag_code: "gs",
    },
    {
      value: "SS#211",
      sortname: "SS",
      label: "+211",
      name: "South Sudan",
      flag_code: "ss",
    },
    {
      value: "ES#34",
      sortname: "ES",
      label: "+34",
      name: "Spain",
      flag_code: "es",
    },
    {
      value: "LK#94",
      sortname: "LK",
      label: "+94",
      name: "Sri Lanka",
      flag_code: "lk",
    },
    {
      value: "SD#249",
      sortname: "SD",
      label: "+249",
      name: "Sudan",
      flag_code: "sd",
    },
    {
      value: "SR#597",
      sortname: "SR",
      label: "+597",
      name: "Suriname",
      flag_code: "sr",
    },
    {
      value: "SJ#47",
      sortname: "SJ",
      label: "+47",
      name: "Svalbard And Jan Mayen Islands",
      flag_code: "sj",
    },
    {
      value: "SZ#268",
      sortname: "SZ",
      label: "+268",
      name: "Swaziland",
      flag_code: "sz",
    },
    {
      value: "SE#46",
      sortname: "SE",
      label: "+46",
      name: "Sweden",
      flag_code: "se",
    },
    {
      value: "CH#41",
      sortname: "CH",
      label: "+41",
      name: "Switzerland",
      flag_code: "ch",
    },
    {
      value: "SY#963",
      sortname: "SY",
      label: "+963",
      name: "Syria",
      flag_code: "sy",
    },
    {
      value: "TW#886",
      sortname: "TW",
      label: "+886",
      name: "Taiwan",
      flag_code: "tw",
    },
    {
      value: "TJ#992",
      sortname: "TJ",
      label: "+992",
      name: "Tajikistan",
      flag_code: "tj",
    },
    {
      value: "TZ#255",
      sortname: "TZ",
      label: "+255",
      name: "Tanzania",
      flag_code: "tz",
    },
    {
      value: "TH#66",
      sortname: "TH",
      label: "+66",
      name: "Thailand",
      flag_code: "th",
    },
    {
      value: "TG#228",
      sortname: "TG",
      label: "+228",
      name: "Togo",
      flag_code: "tg",
    },
    {
      value: "TK#690",
      sortname: "TK",
      label: "+690",
      name: "Tokelau",
      flag_code: "tk",
    },
    {
      value: "TO#676",
      sortname: "TO",
      label: "+676",
      name: "Tonga",
      flag_code: "to",
    },
    {
      value: "TT#1-868",
      sortname: "TT",
      label: "+1-868",
      name: "Trinidad And Tobago",
      flag_code: "tt",
    },
    {
      value: "TN#216",
      sortname: "TN",
      label: "+216",
      name: "Tunisia",
      flag_code: "tn",
    },
    {
      value: "TR#90",
      sortname: "TR",
      label: "+90",
      name: "Turkey",
      flag_code: "tr",
    },
    {
      value: "TM#993",
      sortname: "TM",
      label: "+993",
      name: "Turkmenistan",
      flag_code: "tm",
    },
    {
      value: "TC#1-649",
      sortname: "TC",
      label: "+1-649",
      name: "Turks And Caicos Islands",
      flag_code: "tc",
    },
    {
      value: "TV#688",
      sortname: "TV",
      label: "+688",
      name: "Tuvalu",
      flag_code: "tv",
    },
    {
      value: "UG#256",
      sortname: "UG",
      label: "+256",
      name: "Uganda",
      flag_code: "ug",
    },
    {
      value: "UA#380",
      sortname: "UA",
      label: "+380",
      name: "Ukraine",
      flag_code: "ua",
    },
    {
      value: "AE#971",
      sortname: "AE",
      label: "+971",
      name: "United Arab Emirates",
      flag_code: "ae",
    },
    {
      value: "GB#44",
      sortname: "GB",
      label: "+44",
      name: "United Kingdom",
      flag_code: "gb",
    },
    {
      value: "US#1",
      sortname: "US",
      label: "+1",
      name: "United States",
      flag_code: "us",
    },
    {
      value: "UM#1",
      sortname: "UM",
      label: "+1",
      name: "United States Minor Outlying Islands",
      flag_code: "um",
    },
    {
      value: "UY#598",
      sortname: "UY",
      label: "+598",
      name: "Uruguay",
      flag_code: "uy",
    },
    {
      value: "UZ#998",
      sortname: "UZ",
      label: "+998",
      name: "Uzbekistan",
      flag_code: "uz",
    },
    {
      value: "VU#678",
      sortname: "VU",
      label: "+678",
      name: "Vanuatu",
      flag_code: "vu",
    },
    {
      value: "VA#418",
      sortname: "VA",
      label: "+418",
      name: "Vatican City State (Holy See)",
      flag_code: "va",
    },
    {
      value: "VE#58",
      sortname: "VE",
      label: "+58",
      name: "Venezuela",
      flag_code: "ve",
    },
    {
      value: "VN#84",
      sortname: "VN",
      label: "+84",
      name: "Vietnam",
      flag_code: "vn",
    },
    {
      value: "VG#1",
      sortname: "VG",
      label: "+1",
      name: "Virgin Islands (British)",
      flag_code: "vg",
    },
    {
      value: "VI#1-284",
      sortname: "VI",
      label: "+1-284",
      name: "Virgin Islands (US)",
      flag_code: "vi",
    },
    {
      value: "WF#681",
      sortname: "WF",
      label: "+681",
      name: "Wallis And Futuna Islands",
      flag_code: "wf",
    },
    {
      value: "EH#212",
      sortname: "EH",
      label: "+212",
      name: "Western Sahara",
      flag_code: "eh",
    },
    {
      value: "YE#967",
      sortname: "YE",
      label: "+967",
      name: "Yemen",
      flag_code: "ye",
    },
    {
      value: "YU#38",
      sortname: "YU",
      label: "+38",
      name: "Yugoslavia",
      flag_code: "yu",
    },
    {
      value: "ZM#260",
      sortname: "ZM",
      label: "+260",
      name: "Zambia",
      flag_code: "zm",
    },
    {
      value: "ZW#263",
      sortname: "ZW",
      label: "+263",
      name: "Zimbabwe",
      flag_code: "zw",
    },
  ],

  readFromClipboard: async () => {
    if (navigator?.clipboard?.readText) {
      return await navigator?.clipboard?.readText();
    }
  },
  splitDataIntoArr: (data) =>
    String(data)
      .split("")
      .map((str) => str),

  getCookie: (key, ctx = null) => {
    if (key) {
      return parseCookies(ctx)?.[key];
    } else {
      return parseCookies(ctx);
    }
  },

  saveCookie: (key, value, ctx = null) => {
    const expirationDate = new Date(Date.now() + 86400000)
    if (key) setCookie(ctx, key, JSON.stringify(value), { expires: expirationDate });
  },

  removeCookie: (key) => {
    if (key) destroyCookie(null, key);
  },

  removeCircularReferences: (obj) => {
    const seen = new WeakSet();
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return undefined;
        }
        seen.add(value);
      }
      return value;
    });
  },

  //write code to close dropdown when clicked outside the dropdown
  removeModal: (dropDownRef = null, clickRef = null, cb = () => { }) => {
    const handleClickOutside = (event) => {
      if (
        dropDownRef?.current &&
        !dropDownRef?.current?.contains(event?.target) &&
        clickRef?.current &&
        !clickRef?.current?.contains(event?.target)
      ) {
        cb();
      }
    };
    document.addEventListener("click", handleClickOutside);
    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  },

  extractNConvertToPascalCase(inputString) {
    const matches = inputString?.match(/[^A-Z]*/);
    const toBeConverted = matches ? matches[0] : "";
    return toBeConverted
      ?.split(/[^A-Za-z]+/)
      ?.map(
        (word) => word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase()
      )
      .join("");
  },
  isArrayUnique: (arr) => {
    const uniqueSet = new Set(arr);
    return uniqueSet.size === arr.length;
  },

  isUniqueAndNonEmpty: (options = []) => {
    const uniqueValues = new Set();
    for (const option of options) {
      const label = option.label;
      if (label && !uniqueValues.has(label)) {
        uniqueValues.add(label);
      } else {
        return false;
      }
    }
    return true;
  },
  destroyAllCookies: () => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      let eqPos = cookie.indexOf("=");
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
  },
  toTitleCase: (inputString) => {
    let stringWithSpaces = inputString?.replace(/_/g, " ");
    stringWithSpaces = stringWithSpaces?.trim();
    let titleCaseString = stringWithSpaces?.replace(/\w\S*/g, (match) => {
      return match.charAt(0)?.toUpperCase() + match.substr(1)?.toLowerCase();
    });
    return titleCaseString;
  },

  isSameDate: (d1, d2) => {
    if (d1?.split("T")?.[0] && d2?.split("T")?.[0]) {
      const date1 = dayjs(d1?.split("T")?.[0]);
      const date2 = dayjs(d2?.split("T")?.[0]);
      return date1?.isSame(date2);
    }
  },

  removeHtml: (string, removeBy) => {
    const htmlString = string;
    const tempElement = document.createElement("div");

    tempElement.innerHTML = htmlString;
    const rectDivs = tempElement.querySelectorAll(removeBy);
    rectDivs.forEach((rectDiv) => {
      rectDiv.parentNode.removeChild(rectDiv);
    });
    const updatedHtmlString = tempElement.innerHTML;
    return updatedHtmlString;
  },

  getDPI: () => {
    // Assuming a standard DPI of 96 if devicePixelRatio is not supported
    let dpi = 96;
    if (window.devicePixelRatio) {
      dpi = window.devicePixelRatio * 96;
    }
    return dpi;
  },
  inchesToPixels: (inches, dpi) => {
    return inches * dpi;
  },
  downloadFileByBlob: (blob, fileName = "") => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName; // Specify the desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
  validateImageResolution: async (file, cb = () => { }) => {
    if (file?.size) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const image = new Image();
        image.src = reader.result;
        image.onload = function () {
          const targetWidth = 1000;
          const targetHeight = 2000;
          if (
            image?.width >= targetWidth &&
            image?.width <= targetWidth + 10 &&
            image?.height >= targetHeight &&
            image?.height <= targetHeight + 10
          ) {
            cb(true);
          } else {
            cb(false);
          }
        };
      };
      reader.readAsDataURL(file);
    }
  },
  getFormattedDateTimeData: (date, timezone, formatter = "YYYY-MM-DD") => {
    return dayjs.utc(date).tz(timezone).format(formatter);
  },
  getTimezoneLocalDate: (timezone, formatter = "YYYY-MM-DD") => {
    return dayjs.utc().tz(timezone).format(formatter);
  },
  getLocalTimeZone: () => {
    return dayjs.tz.guess();
  },
  convert_date_to_utc: (date, timezone, formatter = "YYYY-MM-DD HH-mm-ss") => {
    return dayjs.tz(date, timezone).utc().format(formatter);
  },
  convert_date_from_utc: (
    date,
    timezone,
    formatter = "YYYY-MM-DD HH-mm-ss"
  ) => {
    // "2024-02-12T18:30:00+05:30"
    return dayjs.utc(date).tz(timezone).format(formatter);
  },
  downloadCSVFromStream: async (readableStream) => {
    if (readableStream) {
      const reader = readableStream?.getReader();
      let csvData = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          csvData += new TextDecoder().decode(value);
        }

        // Now csvData contains the entire CSV content
        const blob = new Blob([csvData], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "data.csv";
        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (error) {
        console.error("Error reading stream:", error);
      } finally {
        reader.releaseLock();
      }
    }
  },
  convertToArray: (originalObject = {}) => {
    // Convert the object into an array of objects
    const arrayOfObjects = [];
    // Push each key-value pair into the array as an object
    for (const key in originalObject) {
      if (Object.hasOwnProperty.call(originalObject, key)) {
        const value = originalObject[key];
        if (typeof value === 'object') {
          // If the value is an object, spread its properties into the array
          for (const subKey in value) {
            if (Object.hasOwnProperty.call(value, subKey)) {
              const subValue = value[subKey];
              arrayOfObjects.push({ [subKey]: subValue });
            }
          }
        } else {
          // If the value is not an object, directly push it into the array
          arrayOfObjects.push({ [key]: value });
        }
      }
    }

  },
  convertToCSV(data, headerNames, fieldNames, filename) {
    const header = headerNames.join(',');
    const csvRows = [];
    csvRows.push(header);
    data.forEach(item => {
      const row = fieldNames.map(field => {
        const value = (typeof item[field] === 'string') ? item[field] : '';
        return '"' + value.replace(/"/g, '""') + '"';
      });
      csvRows.push(row.join(','));
    });
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};

export default Utils;
