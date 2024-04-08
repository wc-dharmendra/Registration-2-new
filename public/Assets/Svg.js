const Svg = () => {
  return {
    Loader: (
      <svg className="splash-spinner" viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
    ),
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ TOASTER MESSAGE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    Success: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          id="sucess_mark"
          d="M24.563,12.562a12,12,0,1,1-12-12A12,12,0,0,1,24.563,12.562ZM11.174,18.916l8.9-8.9a.774.774,0,0,0,0-1.095L18.983,7.823a.774.774,0,0,0-1.095,0l-7.261,7.261-3.39-3.39a.774.774,0,0,0-1.095,0L5.047,12.789a.774.774,0,0,0,0,1.095l5.032,5.032a.774.774,0,0,0,1.095,0Z"
          transform="translate(-0.563 -0.563)"
          fill="#fff"
        />
      </svg>
    ),

    Warning: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="25.947"
        viewBox="0 0 26 25.947"
      >
        <g id="warning_toast" transform="translate(-69.98 2.45)">
          <path
            id="Path_9639"
            data-name="Path 9639"
            d="M95.98,13.524,82.98.55l-13,12.974,13,12.973ZM84.244,6.8l-.353,9.111H82.05L81.7,6.8ZM81.5,18.664a1.48,1.48,0,1,1,1.469,1.525A1.423,1.423,0,0,1,81.5,18.664Z"
            transform="translate(0 -3)"
            fill="#fff"
          />
        </g>
      </svg>
    ),

    Error: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20.581"
        viewBox="0 0 24 20.581"
      >
        <g id="toast_error" transform="translate(-116.899 -78.389)">
          <path
            id="Path_9637"
            data-name="Path 9637"
            d="M126.834,78.39a1.367,1.367,0,0,0-1.094.648L115.065,97.026a1.314,1.314,0,0,0,.01,1.3,1.361,1.361,0,0,0,1.155.648h21.33a1.391,1.391,0,0,0,1.165-.648,1.29,1.29,0,0,0,0-1.3L128.049,79.038a1.383,1.383,0,0,0-1.215-.648Zm.061,5.429a1.426,1.426,0,0,1,1.428,1.428l-.284,5.145a1.144,1.144,0,1,1-2.289,0l-.284-5.145a1.426,1.426,0,0,1,1.428-1.428Zm0,8.579a1.717,1.717,0,1,1-1.712,1.712A1.718,1.718,0,0,1,126.895,92.4Z"
            transform="translate(2)"
            fill="#fff"
          />
        </g>
      </svg>
    ),

    Info: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          id="info_toast"
          d="M12.563.563a12,12,0,1,0,12,12A12,12,0,0,0,12.563.563Zm0,5.323A2.032,2.032,0,1,1,10.53,7.917,2.032,2.032,0,0,1,12.563,5.885Zm2.71,12.29a.581.581,0,0,1-.581.581H10.433a.581.581,0,0,1-.581-.581V17.014a.581.581,0,0,1,.581-.581h.581v-3.1h-.581a.581.581,0,0,1-.581-.581V11.595a.581.581,0,0,1,.581-.581h3.1a.581.581,0,0,1,.581.581v4.839h.581a.581.581,0,0,1,.581.581Z"
          transform="translate(-0.563 -0.563)"
          fill="#fff"
        />
      </svg>
    ),

    InfoIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          id="info_toast"
          d="M12.563.563a12,12,0,1,0,12,12A12,12,0,0,0,12.563.563Zm0,5.323A2.032,2.032,0,1,1,10.53,7.917,2.032,2.032,0,0,1,12.563,5.885Zm2.71,12.29a.581.581,0,0,1-.581.581H10.433a.581.581,0,0,1-.581-.581V17.014a.581.581,0,0,1,.581-.581h.581v-3.1h-.581a.581.581,0,0,1-.581-.581V11.595a.581.581,0,0,1,.581-.581h3.1a.581.581,0,0,1,.581.581v4.839h.581a.581.581,0,0,1,.581.581Z"
          transform="translate(-0.563 -0.563)"
          fill="#595C5C"
        />
      </svg>
    ),
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ TOASTER MESSAGE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    shareIcon: (color) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17.638"
        height="20.31"
        viewBox="0 0 17.638 20.31"
        style={{ fill: color }}
      >
        <g id="share_icon" transform="translate(0 0)">
          <path
            id="Path_9457"
            data-name="Path 9457"
            d="M179.632,67.2a3.217,3.217,0,0,0-2.981,4.4l-6.1,3.382a3.2,3.2,0,1,0,.008,4.743l6.1,3.382a3.162,3.162,0,0,0-.234,1.194,3.219,3.219,0,1,0,.793-2.1l-5.988-3.324a3.2,3.2,0,0,0,0-3.04l5.988-3.324a3.2,3.2,0,1,0,2.413-5.311Z"
            transform="translate(-165.202 -67.203)"
          ></path>
        </g>
      </svg>
    ),
    MatrixCatgory: (
      <svg xmlns="http://www.w3.org/2000/svg" id="sub-category" width="33.343" height="33.343" viewBox="0 0 33.343 33.343">
        <path id="Path_10009" data-name="Path 10009" d="M14,3.1h8.9a.9.9,0,0,1,.9.9v8.9a.9.9,0,0,1-.9.9H14a.9.9,0,0,1-.9-.9V4A.9.9,0,0,1,14,3.1Zm8,1.8H14.9V12H22Z" transform="translate(5.015 1.433)" fill="#969498" />
        <path id="Path_10010" data-name="Path 10010" d="M4,13.1h8.9a.9.9,0,0,1,.9.9v8.9a.9.9,0,0,1-.9.9H4a.9.9,0,0,1-.9-.9V14A.9.9,0,0,1,4,13.1Zm8,1.8H4.9V22H12Z" transform="translate(1.433 5.015)" fill="#969498" />
        <path id="Path_10011" data-name="Path 10011" d="M18.448,23.8A5.348,5.348,0,1,1,23.8,18.448,5.354,5.354,0,0,1,18.448,23.8Zm0-8.9A3.548,3.548,0,1,0,22,18.448,3.552,3.552,0,0,0,18.448,14.9Z" transform="translate(5.015 5.015)" fill="#969498" />
        <path id="Path_10012" data-name="Path 10012" d="M8.448,13.8A5.348,5.348,0,1,1,13.8,8.448,5.354,5.354,0,0,1,8.448,13.8ZM4.9,8.448A3.548,3.548,0,1,0,5.939,5.939,3.552,3.552,0,0,0,4.9,8.448Z" transform="translate(1.433 1.433)" fill="#969498" />
      </svg>
    ),
    MatrixCatgoryHead: (
      <svg xmlns="http://www.w3.org/2000/svg" id="sub-category" viewBox="0 0 33.343 33.343">
        <path id="Path_10009" data-name="Path 10009" d="M14,3.1h8.9a.9.9,0,0,1,.9.9v8.9a.9.9,0,0,1-.9.9H14a.9.9,0,0,1-.9-.9V4A.9.9,0,0,1,14,3.1Zm8,1.8H14.9V12H22Z" transform="translate(5.015 1.433)" fill="" />
        <path id="Path_10010" data-name="Path 10010" d="M4,13.1h8.9a.9.9,0,0,1,.9.9v8.9a.9.9,0,0,1-.9.9H4a.9.9,0,0,1-.9-.9V14A.9.9,0,0,1,4,13.1Zm8,1.8H4.9V22H12Z" transform="translate(1.433 5.015)" fill="" />
        <path id="Path_10011" data-name="Path 10011" d="M18.448,23.8A5.348,5.348,0,1,1,23.8,18.448,5.354,5.354,0,0,1,18.448,23.8Zm0-8.9A3.548,3.548,0,1,0,22,18.448,3.552,3.552,0,0,0,18.448,14.9Z" transform="translate(5.015 5.015)" fill="" />
        <path id="Path_10012" data-name="Path 10012" d="M8.448,13.8A5.348,5.348,0,1,1,13.8,8.448,5.354,5.354,0,0,1,8.448,13.8ZM4.9,8.448A3.548,3.548,0,1,0,5.939,5.939,3.552,3.552,0,0,0,4.9,8.448Z" transform="translate(1.433 1.433)" fill="" />
      </svg>
    ),
    HelpIcon: (
      <svg
        id="help"
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="21"
        viewBox="0 0 21 21"
      >
        <g id="Group_896" data-name="Group 896">
          <path
            id="Path_9970"
            data-name="Path 9970"
            d="M0,0H21V21H0Z"
            fill="none"
          />
          <path
            id="Path_9971"
            data-name="Path 9971"
            d="M10.875,10.875,3,10.875A7.875,7.875,0,1,0,10.875,3,7.875,7.875,0,0,0,3,10.875"
            transform="translate(-0.375 -0.375)"
            fill="none"
            stroke="#91959d"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            id="Path_9972"
            data-name="Path 9972"
            d="M12,17v.009"
            transform="translate(-1.5 -2.125)"
            fill="none"
            stroke="#91959d"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            id="Path_9973"
            data-name="Path 9973"
            d="M11.75,12.684a1.313,1.313,0,0,1,.875-1.312A2.275,2.275,0,1,0,10,7.871"
            transform="translate(-1.25 -0.871)"
            fill="none"
            stroke="#91959d"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    ),
    SaveChagnes: (
      <svg
        id="save_changes"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          id="Path_9978"
          data-name="Path 9978"
          d="M0,0H24V24H0Z"
          fill="none"
        />
        <path
          id="Path_9979"
          data-name="Path 9979"
          d="M8,7a4,4,0,1,0,4-4A4,4,0,0,0,8,7"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          id="Path_9980"
          data-name="Path 9980"
          d="M6,21V19a4,4,0,0,1,4-4h4"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          id="Path_9981"
          data-name="Path 9981"
          d="M15,19l2,2,4-4"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    ),
    NewRegistration: (
      <svg
        id="save_changes"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          id="Path_9978"
          data-name="Path 9978"
          d="M0,0H24V24H0Z"
          fill="none"
        />
        <path
          id="Path_9979"
          data-name="Path 9979"
          d="M8,7a4,4,0,1,0,4-4A4,4,0,0,0,8,7"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          id="Path_9980"
          data-name="Path 9980"
          d="M6,21V19a4,4,0,0,1,4-4h4"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          id="Path_9981"
          data-name="Path 9981"
          d="M15,19l2,2,4-4"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    ),
    HomeIcon: (color = "#6f6f6f") => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25.811"
        height="23.825"
        viewBox="0 0 25.811 23.825"
      >
        <path
          id="home_icon"
          d="M13.3,28.325V20.384h5.956v7.942h6.056V16.413h3.872L16.28,4.5,3.375,16.413H7.247V28.325Z"
          transform="translate(-3.375 -4.5)"
          fill={color}
        />
      </svg>
    ),
    PasteCode: (
      <svg xmlns="http://www.w3.org/2000/svg" id="paste_code" width="20.825" height="20.825" viewBox="0 0 20.825 20.825">
        <path id="Path_9967" data-name="Path 9967" d="M0,0H20.825V20.825H0Z" fill="none" />
        <path id="Path_9968" data-name="Path 9968" d="M15.412,19.633H6.735A2.488,2.488,0,0,1,4.25,17.148V6.735A2.488,2.488,0,0,1,6.735,4.25H8.471a.75.75,0,0,1,0,1.5H6.735a.987.987,0,0,0-.985.985V17.148a.987.987,0,0,0,.985.985h8.677a.987.987,0,0,0,.985-.985V6.735a.987.987,0,0,0-.985-.985H13.677a.75.75,0,0,1,0-1.5h1.735A2.488,2.488,0,0,1,17.9,6.735V17.148A2.488,2.488,0,0,1,15.412,19.633Z" transform="translate(-0.661 -0.661)" fill="" stroke="none" />
        <path id="Path_9969" data-name="Path 9969" d="M10.735,2.25h1.735a2.485,2.485,0,0,1,0,4.971H10.735a2.485,2.485,0,0,1,0-4.971Zm1.735,3.471a.985.985,0,0,0,0-1.971H10.735a.985.985,0,0,0,0,1.971Z" transform="translate(-1.191 -0.397)" fill="" stroke="none" />
      </svg>
    ),
    BackIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="29"
        height="29"
        viewBox="0 0 29 29"
      >
        <g id="login_back" transform="translate(-24 43)">
          <rect
            id="Rectangle_4144"
            data-name="Rectangle 4144"
            width="29"
            height="29"
            rx="14.5"
            transform="translate(24 -43)"
            fill="#efefef"
          />
          <path
            id="Path_11"
            data-name="Path 11"
            d="M0,5.357l.39-.408L5.14,0,6,.816,1.639,5.357,6,9.9l-.86.817L.39,5.765Z"
            transform="matrix(1, 0.017, -0.017, 1, 35.687, -33.908)"
            fill="#595c5c"
            stroke="#595c5c"
            strokeWidth="0.5"
          />
        </g>
      </svg>
    ),
    LockIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 28 28"
      >
        <g id="lock_icon" transform="translate(-607 -443)">
          <g
            id="Group_915"
            data-name="Group 915"
            transform="translate(607 443)"
          >
            <path
              id="Path_9982"
              data-name="Path 9982"
              d="M0,0H28V28H0Z"
              fill="none"
            />
            <g
              id="Group_916"
              data-name="Group 916"
              transform="translate(-2.457 -2.764)"
            >
              <path
                id="Path_9987"
                data-name="Path 9987"
                d="M8,11m0,1.781A1.781,1.781,0,0,1,9.781,11H20.466a1.781,1.781,0,0,1,1.781,1.781v5.342A1.781,1.781,0,0,1,20.466,19.9H9.781A1.781,1.781,0,0,1,8,18.123Z"
                transform="translate(1.333 4.29)"
                fill="none"
                stroke="#131517"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.7"
              />
              <path
                id="Path_9988"
                data-name="Path 9988"
                d="M10,14.123V10.562a3.562,3.562,0,1,1,7.123,0v3.562"
                transform="translate(2.896 1.167)"
                fill="none"
                stroke="#131517"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.7"
              />
            </g>
          </g>
        </g>
      </svg>
    ),
    PopupCross: (
      <svg
        id="popup_cross"
        xmlns="http://www.w3.org/2000/svg"
        width="27"
        height="27"
        viewBox="0 0 27 27"
      >
        <circle
          id="Ellipse_2856"
          data-name="Ellipse 2856"
          cx="13.5"
          cy="13.5"
          r="13.5"
          fill="#dfe0e1"
        />
        <path
          id="popup_cross-2"
          data-name="popup_cross"
          d="M18.917,8.663,17.778,7.523,13.22,12.081,8.663,7.523,7.523,8.663l4.558,4.558L7.523,17.778l1.139,1.139L13.22,14.36l4.558,4.558,1.139-1.139L14.36,13.22Z"
          transform="translate(0.28 0.28)"
          fill="#6f6f6f"
        />
      </svg>
    ),
    WhatsAppIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18.081"
        height="18.168"
        viewBox="0 0 18.081 18.168"
      >
        <g id="whatsapp_icon" transform="translate(-4.112 -3.489)">
          <path
            id="Path_9975"
            data-name="Path 9975"
            d="M19.559,6.129A9,9,0,0,0,5.389,16.992L4.112,21.657l4.773-1.252a8.995,8.995,0,0,0,4.3,1.1h0A9.007,9.007,0,0,0,19.559,6.129ZM13.19,19.981h0a7.472,7.472,0,0,1-3.808-1.043l-.273-.162-2.832.743.756-2.761-.178-.283a7.483,7.483,0,1,1,6.339,3.507Z"
            fill="#595c5c"
            fillRule="evenodd"
          />
          <path
            id="Path_9976"
            data-name="Path 9976"
            d="M25.115,22.789c-.225-.113-1.331-.657-1.537-.732s-.356-.113-.506.113-.581.732-.712.882-.262.169-.487.056a6.144,6.144,0,0,1-1.809-1.116,6.78,6.78,0,0,1-1.251-1.558c-.131-.225-.014-.347.1-.459s.225-.263.337-.394a1.536,1.536,0,0,0,.225-.375.414.414,0,0,0-.019-.394c-.056-.113-.506-1.22-.694-1.67s-.368-.379-.506-.386-.281-.008-.431-.008a.826.826,0,0,0-.6.281,2.523,2.523,0,0,0-.787,1.877,4.375,4.375,0,0,0,.919,2.327,10.027,10.027,0,0,0,3.843,3.4,12.916,12.916,0,0,0,1.282.474,3.083,3.083,0,0,0,1.417.089,2.317,2.317,0,0,0,1.518-1.07,1.88,1.88,0,0,0,.131-1.07C25.49,22.958,25.34,22.9,25.115,22.789Z"
            transform="translate(-7.82 -8.412)"
            fill="#595c5c"
            fillRule="evenodd"
          />
        </g>
      </svg>
    ),
    TechSupportIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="53"
        height="53"
        viewBox="0 0 53 53"
      >
        <g id="tech_support" transform="translate(-24 43)">
          <rect
            id="Rectangle_4144"
            data-name="Rectangle 4144"
            width="53"
            height="53"
            rx="26.5"
            transform="translate(24 -43)"
            fill="#efefef"
          />
          <g id="noun-support-1058618" transform="translate(2.914 -62.57)">
            <path
              id="Path_9974"
              data-name="Path 9974"
              d="M48.086,33a8.242,8.242,0,0,0-8.239,8.239v.969H37.908A2.923,2.923,0,0,0,35,45.116V51.9a2.923,2.923,0,0,0,2.908,2.908h2.908a.969.969,0,0,0,.969-.969v-12.6a6.3,6.3,0,0,1,12.6,0v11.98l-4.271,1.954a2.888,2.888,0,0,0-2.029-.848,2.908,2.908,0,1,0,2.908,2.908,2.984,2.984,0,0,0-.015-.348l4.574-2.075h2.711A2.923,2.923,0,0,0,61.171,51.9V45.116a2.923,2.923,0,0,0-2.908-2.908H56.325v-.969A8.242,8.242,0,0,0,48.086,33ZM37.908,44.147h1.939v8.724H37.908a.947.947,0,0,1-.969-.969V45.116A.947.947,0,0,1,37.908,44.147Zm18.417,0h1.939a.947.947,0,0,1,.969.969V51.9a.947.947,0,0,1-.969.969H56.325ZM48.086,56.263a.969.969,0,1,1-.969.969A.955.955,0,0,1,48.086,56.263Z"
              fill="#969498"
            />
          </g>
        </g>
      </svg>
    ),
    FeedBackIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="53"
        height="53"
        viewBox="0 0 53 53"
      >
        <g id="submit_feedback" transform="translate(-24 42.984)">
          <rect
            id="Rectangle_4144"
            data-name="Rectangle 4144"
            width="53"
            height="53"
            rx="26.5"
            transform="translate(24 -42.984)"
            fill="#efefef"
          />
          <path
            id="Path_9977"
            data-name="Path 9977"
            d="M47.977,21.78v.155l-1.6,10.079C46.065,34.6,44.2,36.1,41.413,36.1H29.576a4.151,4.151,0,0,1-2.895-1.137,2.1,2.1,0,0,1-1.241.414h-3.98a2.074,2.074,0,0,1-2.068-2.068V20.85a2.074,2.074,0,0,1,2.068-2.068h3.98a1.951,1.951,0,0,1,1.5.672c.414-.1,4.29-1.344,4.29-4.755V9.892a1.1,1.1,0,0,1,.775-1.034,5.114,5.114,0,0,1,4.394.569,4.959,4.959,0,0,1,1.757,4.238v3.877h5.531A4.269,4.269,0,0,1,47.977,21.78ZM25.338,21h-3.67V33.2h3.67Zm20.417.724a2.054,2.054,0,0,0-2.068-1.964H37.071a1.092,1.092,0,0,1-1.085-1.085V13.717a2.869,2.869,0,0,0-.827-2.429,2.38,2.38,0,0,0-1.654-.362v3.928c0,5.169-5.634,6.771-5.892,6.875h0V32.014a2.074,2.074,0,0,0,2.068,2.068H41.464c2.533,0,2.739-1.654,2.791-2.171v-.052Z"
            transform="translate(16.814 -40.883)"
            fill="#969498"
            stroke="#efefef"
            strokeWidth="0.2"
          />
        </g>
      </svg>
    ),
    UpdatePassword: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28.274"
        height="28.227"
        viewBox="0 0 28.274 28.227"
      >
        <g id="update_password" transform="translate(-19.44 -19.558)">
          <path
            id="Path_10056"
            data-name="Path 10056"
            d="M107.948,141.281a.66.66,0,1,0-1.171.61,12.547,12.547,0,0,1-20,14.663.66.66,0,0,0-1.127.467v3.339a.66.66,0,0,0,1.321,0V158.5a13.868,13.868,0,0,0,20.98-17.218Z"
            transform="translate(-62.071 -114.009)"
            fill="#969498"
            stroke="#969498"
            strokeWidth="0.5"
          />
          <path
            id="Path_10057"
            data-name="Path 10057"
            d="M24.7,24.8a12.544,12.544,0,0,1,17.741,0,.66.66,0,0,0,1.127-.467V21a.66.66,0,1,0-1.321,0v1.86a13.868,13.868,0,0,0-20.98,17.219.66.66,0,1,0,1.171-.61A12.5,12.5,0,0,1,24.7,24.8Z"
            fill="#969498"
            stroke="#969498"
            strokeWidth="0.5"
          />
          <path
            id="Path_10058"
            data-name="Path 10058"
            d="M121.809,82.812a4.211,4.211,0,0,0-4.206,4.206v2.105h-.642a1.81,1.81,0,0,0-1.808,1.808V96.1a1.81,1.81,0,0,0,1.808,1.808h9.7a1.81,1.81,0,0,0,1.808-1.808V90.931a1.81,1.81,0,0,0-1.808-1.808h-.642V87.018A4.211,4.211,0,0,0,121.809,82.812Zm-3.143,4.206a3.143,3.143,0,0,1,6.287,0v2.105h-6.287Zm8.736,3.913V96.1a.745.745,0,0,1-.744.744h-9.7a.745.745,0,0,1-.744-.744V90.931a.745.745,0,0,1,.744-.744h9.7a.745.745,0,0,1,.744.744Z"
            transform="translate(-88.235 -57.48)"
            fill="#969498"
            stroke="#969498"
            strokeWidth="0.5"
          />
          <ellipse
            id="Ellipse_2892"
            data-name="Ellipse 2892"
            cx="1.063"
            cy="1.063"
            rx="1.063"
            ry="1.063"
            transform="translate(35.913 34.974)"
            fill="#969498"
            stroke="#969498"
            strokeWidth="0.5"
          />
          <ellipse
            id="Ellipse_2893"
            data-name="Ellipse 2893"
            cx="1.063"
            cy="1.063"
            rx="1.063"
            ry="1.063"
            transform="translate(32.511 34.974)"
            fill="#969498"
            stroke="#969498"
            strokeWidth="0.5"
          />
          <ellipse
            id="Ellipse_2894"
            data-name="Ellipse 2894"
            cx="1.063"
            cy="1.063"
            rx="1.063"
            ry="1.063"
            transform="translate(29.108 34.974)"
            fill="#969498"
            stroke="#969498"
            strokeWidth="0.5"
          />
        </g>
      </svg>
    ),
    UpArrow: (cls = "") => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="49"
        height="49"
        viewBox="0 0 49 49"
        className={cls}
      >
        <defs>
          <filter
            id="Ellipse_2889"
            x="0"
            y="0"
            width="49"
            height="49"
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy="3" input="SourceAlpha" />
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodOpacity="0.161" />
            <feComposite operator="in" in2="blur" />
            <feComposite in="SourceGraphic" />
          </filter>
        </defs>
        <g id="arrow_upload" transform="translate(-812 -792)">
          <g
            transform="matrix(1, 0, 0, 1, 812, 792)"
            filter="url(#Ellipse_2889)"
          >
            <g
              id="Ellipse_2889-2"
              data-name="Ellipse 2889"
              transform="translate(9 6)"
              fill="#fff"
              stroke="#f9f9f9"
              strokeWidth="2"
            >
              <circle cx="15.5" cy="15.5" r="15.5" stroke="none" />
              <circle cx="15.5" cy="15.5" r="14.5" fill="none" />
            </g>
          </g>
          <g
            id="Group_923"
            data-name="Group 923"
            transform="translate(824 796.856)"
          >
            <path
              id="Path_9996"
              data-name="Path 9996"
              d="M9,16.048,13.048,12,17.1,16.048"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              id="Path_9997"
              data-name="Path 9997"
              d="M12,12V24.144"
              transform="translate(1.048)"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </g>
        </g>
      </svg>
    ),
    DownArrow: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12.471"
        height="6.984"
        viewBox="0 0 12.471 6.984"
      >
        <g id="down_arrow" transform="translate(-1013.3 55.828) rotate(-90)">
          <path
            id="Path_11"
            data-name="Path 11"
            d="M34.844,981.535l.454.475,5.53,5.76,1-.95-5.076-5.285,5.076-5.285-1-.951-5.53,5.76Z"
            transform="translate(14 38)"
            fill="#969498"
          />
        </g>
      </svg>
    ),
    DownArrowInsight: (
      <svg xmlns="http://www.w3.org/2000/svg" width="10.713" height="6" viewBox="0 0 10.713 6">
  <path id="dropdown_arrow" d="M0,5.357l.39.408L5.14,10.713,6,9.9,1.639,5.357,6,.817,5.14,0,.39,4.949Z" transform="translate(0 6) rotate(-90)" fill=""/>
</svg>
    ),
    DownArrowDark: (
      <svg xmlns="http://www.w3.org/2000/svg" width="12.833" height="7.187" viewBox="0 0 12.833 7.187">
        <path id="Path_11" data-name="Path 11" d="M0,6.417l.467.489,5.69,5.928,1.03-.978L1.964,6.417,7.187.978,6.157,0,.467,5.928Z" transform="translate(0 7.187) rotate(-90)" fill="" />
      </svg>
    ),
    CustomizeEmail: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="customize_email"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <path
          id="Path_9903"
          data-name="Path 9903"
          d="M0,0H20V20H0Z"
          fill="none"
        />
        <path
          id="Path_9904"
          data-name="Path 9904"
          d="M3,6.558A1.588,1.588,0,0,1,4.616,5H15.929a1.588,1.588,0,0,1,1.616,1.558v7.792a1.588,1.588,0,0,1-1.616,1.558H4.616A1.588,1.588,0,0,1,3,14.351Z"
          transform="translate(-0.273 -0.455)"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          id="Path_9905"
          data-name="Path 9905"
          d="M3,7l7.273,5.455L17.545,7"
          transform="translate(-0.273 -1.343)"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    ),
    ResendEmail: (
      <svg id="email_address" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
        <path id="Path_9773" data-name="Path 9773" d="M0,0H20V20H0Z" fill="none" />
        <path id="Path_9774" data-name="Path 9774" d="M18.667,7.535v7.887a2.5,2.5,0,0,1-2.353,2.5l-.147,0H4.5A2.5,2.5,0,0,1,2,15.569l0-.147V7.535l7.871,5.247.1.055a.833.833,0,0,0,.732,0l.1-.055,7.871-5.247Z" transform="translate(-0.333 -1.256)" fill="#fff" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
        <path id="Path_9775" data-name="Path 9775" d="M16.241,4A2.5,2.5,0,0,1,18.37,5.189L10.408,10.5,2.445,5.189A2.5,2.5,0,0,1,4.407,4.006L4.574,4Z" transform="translate(-0.407 -0.667)" fill="#fff" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    Edit: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="add_question"
        width="16"
        height="15.986"
        viewBox="0 0 16 15.986"
      >
        <path
          id="edit_icon"
          d="M153.467,90.008l-8.579,8.578a1.808,1.808,0,0,0-.428.721l-1.374,4.706a.8.8,0,0,0,.2.788.782.782,0,0,0,.563.225.769.769,0,0,0,.225-.022l4.706-1.373a1.809,1.809,0,0,0,.721-.428l8.6-8.6a3.269,3.269,0,0,0,.946-2.319,3.243,3.243,0,0,0-5.584-2.274ZM148.9,101.581l-2.387-2.387,6.53-6.529,2.387,2.386Zm-3.175-.968,1.756,1.756L145,103.09ZM156.98,93.5l-.428.428-2.387-2.387.428-.428a1.685,1.685,0,0,1,2.387,0,1.7,1.7,0,0,1,0,2.387Z"
          transform="translate(-143.051 -89.04)"
          fill=""
        />
      </svg>
    ),
    EditPencil: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="add_question"
        width="16"
        height="15.986"
        viewBox="0 0 16 15.986"
      >
        <path
          id="edit_icon"
          d="M153.467,90.008l-8.579,8.578a1.808,1.808,0,0,0-.428.721l-1.374,4.706a.8.8,0,0,0,.2.788.782.782,0,0,0,.563.225.769.769,0,0,0,.225-.022l4.706-1.373a1.809,1.809,0,0,0,.721-.428l8.6-8.6a3.269,3.269,0,0,0,.946-2.319,3.243,3.243,0,0,0-5.584-2.274ZM148.9,101.581l-2.387-2.387,6.53-6.529,2.387,2.386Zm-3.175-.968,1.756,1.756L145,103.09ZM156.98,93.5l-.428.428-2.387-2.387.428-.428a1.685,1.685,0,0,1,2.387,0,1.7,1.7,0,0,1,0,2.387Z"
          transform="translate(-143.051 -89.04)"
          fill="#afb0b0"
        />
      </svg>
    ),
    Email: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="email"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >

        <path
          id="Path_9774"
          data-name="Path 9774"
          d="M18.667,7.535v7.887a2.5,2.5,0,0,1-2.353,2.5l-.147,0H4.5A2.5,2.5,0,0,1,2,15.569l0-.147V7.535l7.871,5.247.1.055a.833.833,0,0,0,.732,0l.1-.055,7.871-5.247Z"
          transform="translate(-0.333 -1.256)"
          fill="#5f6061"
          stroke=""
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Path_9775"
          data-name="Path 9775"
          d="M16.241,4A2.5,2.5,0,0,1,18.37,5.189L10.408,10.5,2.445,5.189A2.5,2.5,0,0,1,4.407,4.006L4.574,4Z"
          transform="translate(-0.407 -0.667)"
          fill="#5f6061"
          stroke=""
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    Name: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13.021"
        height="16.9"
        viewBox="0 0 13.021 16.9"
      >
        <g id="name" transform="translate(-22.05 -13.66)">
          <path
            id="Path_9906"
            data-name="Path 9906"
            d="M41.815,16.734a3.343,3.343,0,0,0-3.558-3.074A3.343,3.343,0,0,0,34.7,16.734a3.341,3.341,0,0,0,3.558,3.072A3.342,3.342,0,0,0,41.815,16.734Z"
            transform="translate(-9.709 0)"
            fill="#5f6061"
          />
          <path
            id="Path_9907"
            data-name="Path 9907"
            d="M22.05,52.313c0,3.1,2.909,3.6,6.511,3.6s6.511-.5,6.511-3.6S32.139,46.7,28.549,46.7,22.05,49.214,22.05,52.313Z"
            transform="translate(0 -25.357)"
            fill="#5f6061"
          />
        </g>
      </svg>
    ),
    Identity: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <g id="identity" transform="translate(-327 -740)">
          <circle
            id="Ellipse_2871"
            data-name="Ellipse 2871"
            cx="12"
            cy="12"
            r="12"
            transform="translate(327 740)"
            fill="#4ec881"
          />
          <g
            id="Group_815"
            data-name="Group 815"
            transform="translate(330 743)"
          >
            <path
              id="Path_9908"
              data-name="Path 9908"
              d="M0,0H18V18H0Z"
              fill="none"
            />
            <path
              id="Path_9909"
              data-name="Path 9909"
              d="M7,12H9.25v3H7Z"
              transform="translate(-1.75 -3)"
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
            />
            <path
              id="Path_9910"
              data-name="Path 9910"
              d="M8.25,6H3.75A.75.75,0,0,0,3,6.75v9a.75.75,0,0,0,.75.75h12a.75.75,0,0,0,.75-.75v-9A.75.75,0,0,0,15.75,6h-4.5"
              transform="translate(-0.75 -1.5)"
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
            />
            <path
              id="Path_9911"
              data-name="Path 9911"
              d="M10,3m0,.75A.75.75,0,0,1,10.75,3h1.5a.75.75,0,0,1,.75.75V6a.75.75,0,0,1-.75.75h-1.5A.75.75,0,0,1,10,6Z"
              transform="translate(-2.5 -0.75)"
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
            />
            <path
              id="Path_9912"
              data-name="Path 9912"
              d="M14,16h1.5"
              transform="translate(-3.5 -4)"
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
            />
            <path
              id="Path_9913"
              data-name="Path 9913"
              d="M14,12h3"
              transform="translate(-3.5 -3)"
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
            />
          </g>
        </g>
      </svg>
    ),
    EventArrow: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9.598"
        height="9.587"
        viewBox="0 0 9.598 9.587"
      >
        <path
          id="event_page_arrow"
          d="M12,19.88q3.583-3.583,7.156-7.145H14.827V12h5.563v5.573h-.725V13.245l-7.145,7.145C12.347,20.227,12.174,20.054,12,19.88Z"
          transform="translate(-11.293 -11.5)"
          fill=""
          stroke=""
          strokeWidth="1"
          fillRule="evenodd"
        />
      </svg>
    ),
    TimeZoneArrow: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9.598"
        height="9.587"
        viewBox="0 0 9.598 9.587"
      >
        <path
          id="timezone_arrow"
          d="M12,19.88q3.583-3.583,7.156-7.145H14.827V12h5.563v5.573h-.725V13.245l-7.145,7.145C12.347,20.227,12.174,20.054,12,19.88Z"
          transform="translate(-11.293 -11.5)"
          fill="#131517"
          stroke="#131517"
          strokeWidth="1"
          fillRule="evenodd"
          opacity="0.7"
        />
      </svg>
    ),
    TimeZoneArrowWhite: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9.598"
        height="9.587"
        viewBox="0 0 9.598 9.587"
      >
        <path
          id="timezone_arrow"
          d="M12,19.88q3.583-3.583,7.156-7.145H14.827V12h5.563v5.573h-.725V13.245l-7.145,7.145C12.347,20.227,12.174,20.054,12,19.88Z"
          transform="translate(-11.293 -11.5)"
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth="1"
          fillRule="evenodd"
          opacity="0.7"
        />
      </svg>
    ),
    AddCagegoryIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="56"
        height="56"
        viewBox="0 0 56 56"
      >
        <defs>
          <filter
            id="Rectangle_4106"
            x="0"
            y="0"
            width="56"
            height="56"
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy="3" input="SourceAlpha" />
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodOpacity="0.078" />
            <feComposite operator="in" in2="blur" />
            <feComposite in="SourceGraphic" />
          </filter>
        </defs>
        <g id="add_category" transform="translate(-63.703 -65)">
          <g
            transform="matrix(1, 0, 0, 1, 63.7, 65)"
            filter="url(#Rectangle_4106)"
          >
            <rect
              id="Rectangle_4106-2"
              data-name="Rectangle 4106"
              width="38"
              height="38"
              rx="19"
              transform="translate(9 6)"
              fill="#fafafa"
            />
          </g>
          <g
            id="Group_1041"
            data-name="Group 1041"
            transform="translate(5.681 4.681)"
          >
            <g id="Group_1046" data-name="Group 1046">
              <rect
                id="Rectangle_4265"
                data-name="Rectangle 4265"
                width="20"
                height="2"
                transform="translate(76.022 84.319)"
                fill="#333537"
              />
              <rect
                id="Rectangle_4266"
                data-name="Rectangle 4266"
                width="20"
                height="2"
                transform="translate(87.022 75.319) rotate(90)"
                fill="#333537"
              />
            </g>
          </g>
        </g>
      </svg>
    ),

    Drag: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="13"
        viewBox="0 0 10 13"
      >
        <g id="dots" transform="translate(-129 -41)">
          <circle
            id="Ellipse_2873"
            data-name="Ellipse 2873"
            cx="1.5"
            cy="1.5"
            r="1.5"
            transform="translate(129 41)"
            fill="#5f6062"
          />
          <circle
            id="Ellipse_2876"
            data-name="Ellipse 2876"
            cx="1.5"
            cy="1.5"
            r="1.5"
            transform="translate(129 46)"
            fill="#5f6062"
          />
          <circle
            id="Ellipse_2878"
            data-name="Ellipse 2878"
            cx="1.5"
            cy="1.5"
            r="1.5"
            transform="translate(129 51)"
            fill="#5f6062"
          />
          <circle
            id="Ellipse_2874"
            data-name="Ellipse 2874"
            cx="1.5"
            cy="1.5"
            r="1.5"
            transform="translate(136 41)"
            fill="#5f6062"
          />
          <circle
            id="Ellipse_2875"
            data-name="Ellipse 2875"
            cx="1.5"
            cy="1.5"
            r="1.5"
            transform="translate(136 46)"
            fill="#5f6062"
          />
          <circle
            id="Ellipse_2877"
            data-name="Ellipse 2877"
            cx="1.5"
            cy="1.5"
            r="1.5"
            transform="translate(136 51)"
            fill="#5f6062"
          />
        </g>
      </svg>
    ),
    Delete: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16.219"
        height="16.2"
        viewBox="0 0 16.219 16.2"
      >
        <g id="delete_icon_grey" transform="translate(0.109 0.1)">
          <g id="Group_639" data-name="Group 639">
            <path
              id="Path_9730"
              data-name="Path 9730"
              d="M131.863,49.07h-4v-.8a1.6,1.6,0,0,0-1.6-1.6h-3.2a1.6,1.6,0,0,0-1.6,1.6v.8h-4a.8.8,0,1,0,0,1.6h1.6v9.6a2.4,2.4,0,0,0,2.4,2.4h6.4a2.4,2.4,0,0,0,2.4-2.4v-9.6h1.6a.8.8,0,1,0,0-1.6Zm-8.8-.8h3.2v.8h-3.2Zm5.6,12h0a.8.8,0,0,1-.8.8h-6.4a.8.8,0,0,1-.8-.8v-9.6h8Z"
              transform="translate(-116.663 -46.67)"
              fill="#afb0b0"
              stroke="#fff"
              strokeWidth="0.2"
            />
            <path
              id="Path_9731"
              data-name="Path 9731"
              d="M280.8,186.67a.8.8,0,0,0-.8.8v7.2a.8.8,0,0,0,1.6,0v-7.2a.8.8,0,0,0-.8-.8Z"
              transform="translate(-274.398 -181.87)"
              fill="#afb0b0"
              stroke="#fff"
              strokeWidth="0.2"
            />
            <path
              id="Path_9732"
              data-name="Path 9732"
              d="M374.134,186.67a.8.8,0,0,0-.8.8v7.2a.8.8,0,0,0,1.6,0v-7.2a.8.8,0,0,0-.8-.8Z"
              transform="translate(-364.534 -181.87)"
              fill="#afb0b0"
              stroke="#fff"
              strokeWidth="0.2"
            />
          </g>
        </g>
      </svg>
    ),

    DeleteDark: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16.219"
        height="16.2"
        viewBox="0 0 16.219 16.2"
      >
        <g id="delete_icon_grey" transform="translate(0.109 0.1)">
          <g id="Group_639" data-name="Group 639">
            <path
              id="Path_9730"
              data-name="Path 9730"
              d="M131.863,49.07h-4v-.8a1.6,1.6,0,0,0-1.6-1.6h-3.2a1.6,1.6,0,0,0-1.6,1.6v.8h-4a.8.8,0,1,0,0,1.6h1.6v9.6a2.4,2.4,0,0,0,2.4,2.4h6.4a2.4,2.4,0,0,0,2.4-2.4v-9.6h1.6a.8.8,0,1,0,0-1.6Zm-8.8-.8h3.2v.8h-3.2Zm5.6,12h0a.8.8,0,0,1-.8.8h-6.4a.8.8,0,0,1-.8-.8v-9.6h8Z"
              transform="translate(-116.663 -46.67)"
              fill=""
              stroke="#fff"
              strokeWidth="0.2"
            />
            <path
              id="Path_9731"
              data-name="Path 9731"
              d="M280.8,186.67a.8.8,0,0,0-.8.8v7.2a.8.8,0,0,0,1.6,0v-7.2a.8.8,0,0,0-.8-.8Z"
              transform="translate(-274.398 -181.87)"
              fill=""
              stroke="#fff"
              strokeWidth="0.2"
            />
            <path
              id="Path_9732"
              data-name="Path 9732"
              d="M374.134,186.67a.8.8,0,0,0-.8.8v7.2a.8.8,0,0,0,1.6,0v-7.2a.8.8,0,0,0-.8-.8Z"
              transform="translate(-364.534 -181.87)"
              fill=""
              stroke="#fff"
              strokeWidth="0.2"
            />
          </g>
        </g>
      </svg>
    ),
    RightArrow: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="6.7"
        height="11.418"
        viewBox="0 0 6.7 11.418"
      >
        <path
          id="category_name_arrow"
          d="M6,5.357l-.39-.408L.86,0,0,.816l4.361,4.54L0,9.9l.86.817L5.61,5.765Z"
          transform="translate(0.354 0.353)"
          fill="#131517"
          stroke="#131517"
          strokeWidth="0.5"
        />
      </svg>
    ),
    RightArrowGrey: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="6.7"
        height="11.418"
        viewBox="0 0 6.7 11.418"
      >
        <path
          id="category_name_arrow"
          d="M6,5.357l-.39-.408L.86,0,0,.816l4.361,4.54L0,9.9l.86.817L5.61,5.765Z"
          transform="translate(0.354 0.353)"
          fill=""
          stroke=""
          strokeWidth="0.5"
        />
      </svg>
    ),
    RightArrowWhite: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="6.7"
        height="11.418"
        viewBox="0 0 6.7 11.418"
      >
        <path
          id="category_name_arrow"
          d="M6,5.357l-.39-.408L.86,0,0,.816l4.361,4.54L0,9.9l.86.817L5.61,5.765Z"
          transform="translate(0.354 0.353)"
          fill="#fff"
          stroke="#fff"
          strokeWidth="0.5"
        />
      </svg>
    ),

    TopBottomTheme: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="86"
        height="66"
        viewBox="0 0 86 66"
      >
        <g id="top_btm" transform="translate(-738 -304)">
          <g
            id="Rectangle_4131"
            data-name="Rectangle 4131"
            transform="translate(739 305)"
            fill="#f4f5f6"
            stroke="#e5e6e7"
            strokeWidth="1"
          >
            <rect width="84" height="64" rx="8" stroke="none" />
            <rect
              x="-0.5"
              y="-0.5"
              width="85"
              height="65"
              rx="8.5"
              fill="none"
            />
          </g>
          <rect
            id="Rectangle_4132"
            data-name="Rectangle 4132"
            width="58"
            height="24"
            rx="3"
            transform="translate(752 311)"
            fill="#e8eaea"
          />
          <rect
            id="Rectangle_4133"
            data-name="Rectangle 4133"
            width="33"
            height="23"
            transform="translate(752 339)"
            fill="#e8eaea"
          />
          <rect
            id="Rectangle_4221"
            data-name="Rectangle 4221"
            width="21"
            height="7"
            transform="translate(789 339)"
            fill="#e8eaea"
          />
          <rect
            id="Rectangle_4222"
            data-name="Rectangle 4222"
            width="21"
            height="13"
            transform="translate(789 349)"
            fill="#e8eaea"
          />
        </g>
      </svg>
    ),

    LeftRightTheme: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="86"
        height="66"
        viewBox="0 0 86 66"
      >
        <g id="left_right_sel" transform="translate(-738 -304)">
          <g
            id="Rectangle_4131"
            data-name="Rectangle 4131"
            transform="translate(739 305)"
            fill="#e0e2e5"
            stroke="#e5e6e7"
            strokeWidth="1"
          >
            <rect width="84" height="64" rx="8" stroke="none" />
            <rect
              x="-0.5"
              y="-0.5"
              width="85"
              height="65"
              rx="8.5"
              fill="none"
            />
          </g>
          <rect
            id="Rectangle_4135"
            data-name="Rectangle 4135"
            width="70"
            height="52"
            rx="5"
            transform="translate(746 311)"
            fill="#f6f7f8"
          />
          <rect
            id="Rectangle_4132"
            data-name="Rectangle 4132"
            width="18"
            height="18"
            transform="translate(755 318)"
            fill="#e6e7e8"
          />
          <rect
            id="Rectangle_4133"
            data-name="Rectangle 4133"
            width="32"
            height="40"
            transform="translate(778 318)"
            fill="#e6e7e8"
          />
        </g>
      </svg>
    ),

    UpdownArrow: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="11.418"
        height="15.691"
        viewBox="0 0 11.418 15.691"
      >
        <g id="up_down_arrow" transform="translate(-684.412 -244.654)">
          <path
            id="Path_9744"
            data-name="Path 9744"
            d="M34.844,980.656l.39.408,4.751,4.948.86-.816-4.361-4.54,4.361-4.54-.86-.817-4.751,4.948Z"
            transform="translate(-290.535 294.844) rotate(-90)"
            fill="#969498"
            stroke="#969498"
            strokeWidth="0.5"
          />
          <path
            id="Path_9745"
            data-name="Path 9745"
            d="M0,5.357l.39-.408L5.14,0,6,.816,1.639,5.357,6,9.9l-.86.817L.39,5.765Z"
            transform="translate(695.478 245) rotate(90)"
            fill="#969498"
            stroke="#969498"
            strokeWidth="0.5"
          />
        </g>
      </svg>
    ),
    ChooseArrow: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
      >
        <defs>
          <clipPath id="clipPath">
            <rect
              id="Rectangle_3952"
              data-name="Rectangle 3952"
              width="28"
              height="28"
              rx="9"
            />
          </clipPath>
        </defs>
        <g id="img_upload" transform="translate(-667 -200)">
          <g
            id="Rectangle_3953"
            data-name="Rectangle 3953"
            transform="translate(672 206)"
            fill="#fff"
            stroke="#707070"
            strokeWidth="1"
          >
            <rect width="21" height="18" stroke="none" />
            <rect x="0.5" y="0.5" width="20" height="17" fill="none" />
          </g>
          <g
            id="Group_616"
            data-name="Group 616"
            transform="translate(668 201)"
            clipPath="url(#clipPath)"
          >
            <path
              id="Path_10"
              data-name="Path 10"
              d="M6.642,19.987l4.452-5.935a.539.539,0,0,1,.912,0l4.452,5.935c.251.336.116.608-.3.608H6.946c-.42,0-.556-.273-.3-.608ZM4.615,2H25.536a2.617,2.617,0,0,1,2.615,2.615V25.536a2.617,2.617,0,0,1-2.615,2.615H4.615A2.617,2.617,0,0,1,2,25.536V4.615A2.617,2.617,0,0,1,4.615,2Zm13.124,8.416-3.521,4.52a.523.523,0,0,0,0,.6l3.6,4.757a.861.861,0,0,0,.609.3H24.43c.419,0,.575-.286.347-.638l-6.158-9.508A.507.507,0,0,0,17.739,10.416Z"
              transform="translate(-1.128 -1.023)"
              fillRule="evenodd"
            />
          </g>
          <g
            id="Rectangle_4103"
            data-name="Rectangle 4103"
            transform="translate(669 202)"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
          >
            <rect width="26" height="26" rx="6" stroke="none" />
            <rect x="-1" y="-1" width="28" height="28" rx="7" fill="none" />
          </g>
        </g>
      </svg>
    ),

    Phone: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="phone"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >

        <path
          id="Path_9961"
          data-name="Path 9961"
          d="M6,4.667A1.667,1.667,0,0,1,7.667,3h6.667A1.667,1.667,0,0,1,16,4.667V16.333A1.667,1.667,0,0,1,14.333,18H7.667A1.667,1.667,0,0,1,6,16.333Z"
          transform="translate(-1 -0.5)"
          fill="none"
          stroke=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          id="Path_9962"
          data-name="Path 9962"
          d="M11,4h1.667"
          transform="translate(-1.833 -0.667)"
          fill="none"
          stroke=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          id="Path_9963"
          data-name="Path 9963"
          d="M12,17v.008"
          transform="translate(-2 -2.833)"
          fill="none"
          stroke=""
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    ),
    Url: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
      >
        <g id="url" transform="translate(20 -75)">

          <g id="Group_941" data-name="Group 941" transform="translate(-17 78)">
            <path
              id="Path_9949"
              data-name="Path 9949"
              d="M9,13.5,13.5,9"
              transform="translate(-5.25 -5.25)"
              fill="none"
              stroke=""
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              id="Path_9950"
              data-name="Path 9950"
              d="M11,5.5l.347-.4a3.75,3.75,0,0,1,5.3,5.3l-.4.348"
              transform="translate(-5.75 -4)"
              fill="none"
              stroke=""
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              id="Path_9951"
              data-name="Path 9951"
              d="M10.75,16.25l-.3.4a3.8,3.8,0,0,1-5.345,0,3.729,3.729,0,0,1,0-5.3L5.5,11"
              transform="translate(-4 -5.75)"
              fill="none"
              stroke=""
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </g>
        </g>
      </svg>
    ),
    MultipleSelect: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
      >
        <g id="multiple_select" transform="translate(21 -2.652) rotate(90)">

          <g id="Group_945" data-name="Group 945">
            <path
              id="Path_9999"
              data-name="Path 9999"
              d="M7,7l5,5L7,17"
              fill="none"
              stroke=""
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              id="Path_10000"
              data-name="Path 10000"
              d="M13,7l5,5-5,5"
              fill="none"
              stroke=""
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </g>
        </g>
      </svg>
    ),
    SingleSelect: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
      >
        <g id="single_select" transform="translate(21 -3) rotate(90)">
          <path
            id="Path_9999"
            data-name="Path 9999"
            d="M7,7l5,5L7,17"
            transform="translate(2.5 -0.5)"
            fill="none"
            stroke=""
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    ),
    Checkbox: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
      >
        <g id="checkbx" transform="translate(-3 -3)">

          <path
            id="Path_10002"
            data-name="Path 10002"
            d="M5,11.423l4.036,4.036,6.7-6.451"
            transform="translate(1.5 -0.508)"
            fill="none"
            stroke=""
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    ),
    LongText: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
      >
        <g id="long_text" transform="translate(-3 -3)">

          <g
            id="Group_948"
            data-name="Group 948"
            transform="translate(-0.001 -0.842)"
          >
            <path
              id="Path_10004"
              data-name="Path 10004"
              d="M19,10H5"
              transform="translate(0 1.375)"
              fill="none"
              stroke=""
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              id="Path_10005"
              data-name="Path 10005"
              d="M5,6H19"
              transform="translate(0 1.375)"
              fill="none"
              stroke=""
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              id="Path_10006"
              data-name="Path 10006"
              d="M14,14H5"
              transform="translate(0 1.375)"
              fill="none"
              stroke=""
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              id="Path_10007"
              data-name="Path 10007"
              d="M5,18h6"
              transform="translate(0 1.375)"
              fill="none"
              stroke=""
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </g>
        </g>
      </svg>
    ),
    Text: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10.161"
        height="10.827"
        viewBox="0 0 10.161 10.827"
      >
        <g
          id="Group_837"
          data-name="Group 837"
          transform="translate(-2.25 -4.25)"
        >
          <path
            id="Path_9929"
            data-name="Path 9929"
            d="M3,6.332V5h8.661V6.332"
            fill="none"
            stroke=""
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            id="Path_9930"
            data-name="Path 9930"
            d="M10,5v9.327"
            transform="translate(-2.336)"
            fill="none"
            stroke=""
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            id="Path_9931"
            data-name="Path 9931"
            d="M10.665,19H8"
            transform="translate(-1.669 -4.673)"
            fill="none"
            stroke=""
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    ),
    LocationIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="39"
        height="40"
        viewBox="0 0 39 40"
      >
        <g id="location_home" transform="translate(-899 -229)">
          <g
            id="Rectangle_3955"
            data-name="Rectangle 3955"
            transform="translate(899 229)"
            fill="none"
            stroke="#e7e8e9"
            strokeWidth="1"
          >
            <rect width="39" height="40" rx="7" stroke="none" />
            <rect x="0.5" y="0.5" width="38" height="39" rx="6.5" fill="none" />
          </g>
          <path
            id="Path_7"
            data-name="Path 7"
            d="M35.437,15.7a7.939,7.939,0,0,0-12.594,0,7.939,7.939,0,0,0,0,9.608l6.3,8.219,6.3-8.219A7.939,7.939,0,0,0,35.437,15.7Zm-6.3.473A4.139,4.139,0,1,1,25,20.316,4.151,4.151,0,0,1,29.141,16.177Z"
            transform="translate(889.824 226.109)"
            fill="#afb0b1"
          />
        </g>
      </svg>
    ),
    FacebookGray: (
      <svg
        id="fb"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="17.901"
        viewBox="0 0 18 17.901"
      >
        <path
          id="Path_9778"
          data-name="Path 9778"
          d="M18,9.005A9,9,0,1,0,7.594,17.9V11.608H5.309v-2.6H7.594V7.021a3.177,3.177,0,0,1,3.4-3.5,13.832,13.832,0,0,1,2.015.176V5.91H11.873a1.3,1.3,0,0,0-1.467,1.406V9.005h2.5l-.4,2.6h-2.1V17.9A9.006,9.006,0,0,0,18,9.005Z"
          fill="#939597"
        />
      </svg>
    ),
    TwitterGray: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
      >
        <path
          id="twitter"
          d="M10.524,7.776,16.481,1H15.07L9.895,6.882,5.765,1H1L7.247,9.9,1,17H2.411l5.461-6.213L12.235,17H17ZM8.59,9.973l-.634-.886L2.92,2.041H5.089L9.154,7.73l.631.886,5.284,7.394H12.9Z"
          transform="translate(-1 -1)"
          fill="#939597"
        />
      </svg>
    ),
    LinkedInGray: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16.101"
        viewBox="0 0 16 16.101"
      >
        <g id="linkedin_icon" transform="translate(-3.494 -4.667)">
          <path
            id="Path_9781"
            data-name="Path 9781"
            d="M30.037,27.049v-.025l-.016.025Z"
            transform="translate(-17.939 -15.119)"
            fill="#939597"
          />
          <path
            id="Path_9782"
            data-name="Path 9782"
            d="M18.311,4.667H4.676A1.168,1.168,0,0,0,3.494,5.82V19.615a1.168,1.168,0,0,0,1.182,1.153H18.311a1.169,1.169,0,0,0,1.183-1.153V5.82A1.168,1.168,0,0,0,18.311,4.667ZM8.344,18.146H5.927v-7.27H8.344ZM7.136,9.882H7.119A1.259,1.259,0,1,1,7.151,7.37a1.26,1.26,0,1,1-.016,2.512Zm9.922,8.264H14.641V14.255c0-.977-.35-1.644-1.224-1.644a1.324,1.324,0,0,0-1.24.884,1.655,1.655,0,0,0-.079.589v4.06H9.681s.032-6.589,0-7.27H12.1V11.9a2.4,2.4,0,0,1,2.178-1.2c1.59,0,2.782,1.039,2.782,3.273v4.17Z"
            transform="translate(0)"
            fill="#939597"
          />
        </g>
      </svg>
    ),
    GroupGray: (
      <svg
        id="Group_710"
        data-name="Group 710"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          id="Path_9783"
          data-name="Path 9783"
          d="M0,0H24V24H0Z"
          fill="none"
        />
        <path
          id="Path_9784"
          data-name="Path 9784"
          d="M3,20l1.3-3.9A7.417,7.417,0,0,1,6.4,5.726a9.856,9.856,0,0,1,11.846.48,7.362,7.362,0,0,1,1.029,10.5A9.733,9.733,0,0,1,7.7,19L3,20"
          fill="none"
          stroke="#939597"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    ),
    AddGrayIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="12.372" height="12" viewBox="0 0 12.372 12">
        <g id="add_page" transform="translate(-554.113 -491.329)">
          <rect id="Rectangle_4141" data-name="Rectangle 4141" width="2" height="12" transform="translate(559.299 491.329)" fill="" />
          <rect id="Rectangle_4142" data-name="Rectangle 4142" width="2" height="12.372" transform="translate(566.486 496.064) rotate(90)" fill="" />
        </g>
      </svg>
    ),
    PencilIcon: (
      <svg id="edit_icon" xmlns="http://www.w3.org/2000/svg" width="16" height="15.986" viewBox="0 0 16 15.986">
        <g id="edit_icon-2" data-name="edit_icon">
          <path id="edit_icon-3" data-name="edit_icon" d="M153.467,90.008l-8.579,8.578a1.808,1.808,0,0,0-.428.721l-1.374,4.706a.8.8,0,0,0,.2.788.782.782,0,0,0,.563.225.769.769,0,0,0,.225-.022l4.706-1.373a1.809,1.809,0,0,0,.721-.428l8.6-8.6a3.269,3.269,0,0,0,.946-2.319,3.243,3.243,0,0,0-5.584-2.274ZM148.9,101.581l-2.387-2.387,6.53-6.529,2.387,2.386Zm-3.175-.968,1.756,1.756L145,103.09ZM156.98,93.5l-.428.428-2.387-2.387.428-.428a1.685,1.685,0,0,1,2.387,0,1.7,1.7,0,0,1,0,2.387Z" transform="translate(-143.051 -89.04)" fill="#565859" />
        </g>
      </svg>
    ),

    AddReminder: (
      <svg id="add_reminder" xmlns="http://www.w3.org/2000/svg" width="40" height="42" viewBox="0 0 40 42">
        <rect id="Rectangle_4147" data-name="Rectangle 4147" width="40" height="42" rx="8" fill="#fd5b68" opacity="0.1" />
        <g id="Group_844" data-name="Group 844" transform="translate(8.812 10.237)">
          <path id="Path_9933" data-name="Path 9933" d="M36.333,972.858a.678.678,0,0,1,.413.169l5.424,4.746a.68.68,0,1,1-.89,1.028l-5.424-4.746a.678.678,0,0,1,.477-1.2Zm-10.148,0a.678.678,0,0,1,.392,1.2L21.153,978.8a.68.68,0,1,1-.89-1.028l5.424-4.746A.678.678,0,0,1,26.184,972.858Zm5.032,2.044a9.491,9.491,0,1,1-9.491,9.491A9.491,9.491,0,0,1,31.216,974.9Zm0,3.729a.678.678,0,0,0-.678.678v4.809l-2.913,2.913a.674.674,0,0,0,.953.953l3.019-3.03a.828.828,0,0,0,.3-.562V979.31A.678.678,0,0,0,31.216,978.632Z" transform="translate(-20.028 -972.857)" fill="#fd5b68" />
        </g>
      </svg>
    ),
    AddFacebookEmail: (
      <svg id="add_feedback" xmlns="http://www.w3.org/2000/svg" width="40" height="42" viewBox="0 0 40 42">
        <rect id="Rectangle_4147" data-name="Rectangle 4147" width="40" height="42" rx="8" fill="#0e94ff" opacity="0.1" />
        <g id="noun-star-6165748" transform="translate(8.82 9.357)">
          <path id="Path_9934" data-name="Path 9934" d="M15.789,5.212l2.731,6.316a.444.444,0,0,0,.377.273l6.851.645h.012a1.214,1.214,0,0,1,.678,2.122l-5.163,4.55a.441.441,0,0,0-.144.443l1.5,6.715a1.214,1.214,0,0,1-1.806,1.312l-5.922-3.5a.443.443,0,0,0-.466,0l-5.922,3.5a1.213,1.213,0,0,1-1.806-1.312l1.5-6.715a.441.441,0,0,0-.144-.443L2.909,14.571a1.213,1.213,0,0,1,.69-2.123h0l6.852-.645a.444.444,0,0,0,.377-.273l2.729-6.316a1.212,1.212,0,0,1,2.231,0Z" transform="translate(-2.493 -4.475)" fill="#0e94ff" fillRule="evenodd" />
        </g>
      </svg>
    ),
    AddCustomEmail: (
      <svg id="add_feedback" xmlns="http://www.w3.org/2000/svg" width="40" height="42" viewBox="0 0 40 42">
        <rect id="Rectangle_4147" data-name="Rectangle 4147" width="40" height="42" rx="8" fill="#f9bc34" opacity="0.1" />
        <g id="Group_1058" data-name="Group 1058" transform="translate(8 9)">
          <path id="Path_10083" data-name="Path 10083" d="M0,0H24V24H0Z" fill="none" />
          <path id="Path_10084" data-name="Path 10084" d="M14,6,12,6a2,2,0,1,0,2-2,2,2,0,0,0-2,2" fill="none" stroke="#f9bc34" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path id="Path_10085" data-name="Path 10085" d="M4,6h8" fill="none" stroke="#f9bc34" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path id="Path_10086" data-name="Path 10086" d="M16,6h4" fill="none" stroke="#f9bc34" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path id="Path_10087" data-name="Path 10087" d="M8,12,6,12a2,2,0,1,0,2-2,2,2,0,0,0-2,2" fill="none" stroke="#f9bc34" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path id="Path_10088" data-name="Path 10088" d="M4,12H6" fill="none" stroke="#f9bc34" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path id="Path_10089" data-name="Path 10089" d="M10,12H20" fill="none" stroke="#f9bc34" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path id="Path_10090" data-name="Path 10090" d="M17,18m-2,0a2,2,0,1,0,2-2,2,2,0,0,0-2,2" fill="none" stroke="#f9bc34" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path id="Path_10091" data-name="Path 10091" d="M4,18H15" fill="none" stroke="#f9bc34" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path id="Path_10092" data-name="Path 10092" d="M19,18h1" fill="none" stroke="#f9bc34" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    ),
    HeartIcon: (
      <svg id="Group_852" data-name="Group 852" xmlns="http://www.w3.org/2000/svg" width="21.12" height="21.12" viewBox="0 0 21.12 21.12">
        <path id="Path_9942" data-name="Path 9942" d="M0,0H21.12V21.12H0Z" fill="none" />
        <path id="Path_9943" data-name="Path 9943" d="M16.86,11.028l-6.3,6.092-6.3-6.092A4.034,4.034,0,0,1,3.176,6.872,4.17,4.17,0,0,1,6.482,4.047a4.25,4.25,0,0,1,4.077,1.6,4.251,4.251,0,0,1,4.072-1.576,4.17,4.17,0,0,1,3.295,2.818,4.034,4.034,0,0,1-1.066,4.148" transform="translate(0 0)" fill="none" stroke="#595c5c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    ),
    CommentIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14.858" height="13.4" viewBox="0 0 14.858 13.4">
        <path id="Path_9784" data-name="Path 9784" d="M3,15.68l.949-2.848A5.417,5.417,0,0,1,5.483,5.255a7.2,7.2,0,0,1,8.651.351,5.377,5.377,0,0,1,.751,7.669,7.108,7.108,0,0,1-8.453,1.675L3,15.68" transform="translate(-2.051 -3.228)" fill="none" stroke="#595c5c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    ),

    TimerIcon: (
      <svg id="timer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="none" stroke="#4b4c4e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></circle>
        <path id="Path_9940" data-name="Path 9940" d="M12,12l3.545,2.364" transform="translate(-0.312 -0.198)" fill="none" stroke="#4b4c4e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_9941" data-name="Path 9941" d="M12,7v5.909" transform="translate(0 -0.335)" fill="none" stroke="#4b4c4e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    ),
    StarIcon: (
      <svg id="noun-star-6165748" xmlns="http://www.w3.org/2000/svg" width="18.804" height="17.976" viewBox="0 0 18.804 17.976">
        <g id="Path_9934" data-name="Path 9934" transform="translate(-2.493 -4.475)" fill="none" fillRule="evenodd">
          <path d="M12.757,5.044,14.865,9.92a.343.343,0,0,0,.291.211l5.288.5h.009a.937.937,0,0,1,.524,1.638L16.991,15.78a.34.34,0,0,0-.111.342l1.161,5.183a.937.937,0,0,1-1.394,1.012l-4.571-2.706a.342.342,0,0,0-.359,0L7.145,22.318a.936.936,0,0,1-1.394-1.012l1.161-5.183A.34.34,0,0,0,6.8,15.78L2.814,12.268a.936.936,0,0,1,.533-1.639h0l5.289-.5a.343.343,0,0,0,.291-.211l2.107-4.876a.936.936,0,0,1,1.722,0Z" stroke="none" />
          <path d="M 11.89600086212158 6.832426071166992 L 10.30774974822998 10.50786209106445 C 10.04012680053711 11.13994216918945 9.45341682434082 11.56606483459473 8.769768714904785 11.62510776519775 L 4.780200958251953 12.00092697143555 L 7.784214019775391 14.64734745025635 C 8.298263549804688 15.09155750274658 8.52782154083252 15.79762077331543 8.373220443725586 16.45925140380859 L 7.498678207397461 20.36518478393555 L 10.94507026672363 18.32538604736328 C 11.23211002349854 18.15240859985352 11.56042289733887 18.06107139587402 11.89585399627686 18.06107139587402 C 12.23119449615479 18.06107139587402 12.55944919586182 18.15237426757812 12.8464527130127 18.32527160644531 L 16.29303741455078 20.36518096923828 L 15.41848278045654 16.459228515625 C 15.26393985748291 15.79781436920166 15.49324512481689 15.09205722808838 16.00695610046387 14.64782238006592 L 19.01093864440918 12.00047779083252 L 15.02340888977051 11.62493419647217 C 14.33952236175537 11.56599998474121 13.75258255004883 11.13982200622559 13.48495578765869 10.50750350952148 L 11.89600086212158 6.832426071166992 M 11.89585399627686 4.474851608276367 C 12.27108383178711 4.474851608276367 12.61005401611328 4.698951721191406 12.75703430175781 5.044191360473633 L 14.86504459381104 9.919780731201172 C 14.91448402404785 10.03938102722168 15.027024269104 10.12098121643066 15.1560640335083 10.13079071044922 L 20.45367431640625 10.62885093688965 C 20.82519340515137 10.66622161865234 21.13911437988281 10.9205207824707 21.25278472900391 11.27619171142578 C 21.36646461486816 11.63187122344971 21.25821495056152 12.02109146118164 20.97722434997559 12.26700115203857 L 16.99143409729004 15.77959156036377 C 16.89206314086914 15.86307144165039 16.84886360168457 15.99582099914551 16.88007354736328 16.12180137634277 L 18.04063415527344 21.30512237548828 C 18.1240234375 21.67080116271973 17.98127365112305 22.05096054077148 17.67781448364258 22.27137184143066 C 17.37434387207031 22.49179077148438 16.96867370605469 22.50995063781738 16.64671325683594 22.31755065917969 L 12.07553386688232 19.61203193664551 C 11.96538543701172 19.54408073425293 11.82633495330811 19.54408073425293 11.71618461608887 19.61203193664551 L 7.145004272460938 22.31755065917969 C 6.823095321655273 22.51039123535156 6.417146682739258 22.4924201965332 6.113523483276367 22.27190208435059 C 5.809913635253906 22.05137252807617 5.667264938354492 21.67089080810547 5.751083374023438 21.30512237548828 L 6.91163444519043 16.12180137634277 C 6.942844390869141 15.99582099914551 6.899654388427734 15.86307144165039 6.800283432006836 15.77959156036377 L 2.814495086669922 12.26826095581055 C 2.531274795532227 12.02166175842285 2.422763824462891 11.62972164154053 2.538854598999023 11.27258110046387 C 2.654943466186523 10.91545104980469 2.973154067993164 10.66221237182617 3.347234725952148 10.62927055358887 L 8.636693954467773 10.13100051879883 C 8.765744209289551 10.12119102478027 8.878284454345703 10.03959083557129 8.92772388458252 9.919990539550781 L 11.03468418121338 5.044191360473633 C 11.18166446685791 4.698951721191406 11.5206241607666 4.474851608276367 11.89585399627686 4.474851608276367 Z" stroke="none" fill="#4b4c4e" />
        </g>
      </svg>
    ),
    GroupIcon: (
      <svg id="Group_1060" data-name="Group 1060" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path id="Path_10083" data-name="Path 10083" d="M0,0H24V24H0Z" fill="none" />
        <path id="Path_10084" data-name="Path 10084" d="M14,6,12,6a2,2,0,1,0,2-2,2,2,0,0,0-2,2" fill="none" stroke="#4b4c4e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10085" data-name="Path 10085" d="M4,6h8" fill="none" stroke="#4b4c4e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10086" data-name="Path 10086" d="M16,6h4" fill="none" stroke="#4b4c4e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10087" data-name="Path 10087" d="M8,12,6,12a2,2,0,1,0,2-2,2,2,0,0,0-2,2" fill="none" stroke="#4b4c4e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10088" data-name="Path 10088" d="M4,12H6" fill="none" stroke="#4b4c4e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10089" data-name="Path 10089" d="M10,12H20" fill="none" stroke="#4b4c4e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10090" data-name="Path 10090" d="M17,18m-2,0a2,2,0,1,0,2-2,2,2,0,0,0-2,2" fill="none" stroke="#4b4c4e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10091" data-name="Path 10091" d="M4,18H15" fill="none" stroke="#4b4c4e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10092" data-name="Path 10092" d="M19,18h1" fill="none" stroke="#4b4c4e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    ),
    DotsIcon: (
      <svg id="Component_42_2" data-name="Component 42 – 2" xmlns="http://www.w3.org/2000/svg" width="16" height="4" viewBox="0 0 16 4">
        <circle id="Ellipse_2868" data-name="Ellipse 2868" cx="2" cy="2" r="2" fill="#838485" />
        <circle id="Ellipse_2869" data-name="Ellipse 2869" cx="2" cy="2" r="2" transform="translate(6)" fill="#838485" />
        <circle id="Ellipse_2870" data-name="Ellipse 2870" cx="2" cy="2" r="2" transform="translate(12)" fill="#838485" />
      </svg>
    ),
    EmbedBtnIcon: (
      <svg id="embed_button" xmlns="http://www.w3.org/2000/svg" width="22.321" height="22.333" viewBox="0 0 22.321 22.333">
        <path id="Path_10031" data-name="Path 10031" d="M4.968,10.375A5.4,5.4,0,0,1,15.218,8l2.844.658a7.875,7.875,0,1,0-9.38,9.4l-.658-2.844A5.389,5.389,0,0,1,4.968,10.375Z" transform="translate(-2.5 -2.5)" fill="#0e94ff" />
        <path id="Path_10032" data-name="Path 10032" d="M47.5,44.582,42.63,39.715,45.146,38a1.5,1.5,0,0,0,.635-1.528,1.542,1.542,0,0,0-1.152-1.2l-9.85-2.3a1.5,1.5,0,0,0-1.81,1.81l2.3,9.85a1.542,1.542,0,0,0,1.2,1.152,1.145,1.145,0,0,0,.282.024A1.488,1.488,0,0,0,38,45.146l1.716-2.515L44.582,47.5A2.061,2.061,0,0,0,47.5,44.582Z" transform="translate(-25.775 -25.775)" fill="#0e94ff" />
      </svg>
    ),
    EmbedPageIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22.027" height="22.027" viewBox="0 0 22.027 22.027">
        <g id="embed_page" transform="translate(-3 -3)">
          <path id="Path_10033" data-name="Path 10033" d="M18.137,17.658H16.761a.847.847,0,0,1-.806-.585l-.425-1.309-.424,1.309a.847.847,0,0,1-.806.585H12.922l1.113.809a.847.847,0,0,1,.308.947l-.424,1.309,1.113-.809a.847.847,0,0,1,1,0l1.113.809-.424-1.309a.847.847,0,0,1,.308-.947Z" transform="translate(-1.516 -1.95)" fill="#0e94ff" />
          <path id="Path_10034" data-name="Path 10034" d="M5.542,25.027H22.486a2.542,2.542,0,0,0,2.542-2.542V5.542A2.542,2.542,0,0,0,22.486,3H5.542A2.542,2.542,0,0,0,3,5.542V22.486A2.542,2.542,0,0,0,5.542,25.027Zm14.185-9.481L17,17.526l1.041,3.2a.847.847,0,0,1-1.3.947L14.014,19.7l-2.725,1.98a.847.847,0,0,1-1.3-.947l1.041-3.2L8.3,15.546a.847.847,0,0,1,.5-1.533h3.368l1.041-3.2a.847.847,0,0,1,1.61,0l1.043,3.2h3.368a.847.847,0,0,1,.5,1.533Zm-15.032-10a.847.847,0,0,1,.847-.847H22.486a.847.847,0,0,1,.847.847V8.083H4.694Z" transform="translate(0 0)" fill="#0e94ff" />
          <path id="Path_10035" data-name="Path 10035" d="M17.236,6H13.847a.847.847,0,0,0,0,1.694h3.389a.847.847,0,1,0,0-1.694Z" transform="translate(-1.528 -0.458)" fill="#0e94ff" />
        </g>
      </svg>
    ),
    CopyLink: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16.55" height="16.55" viewBox="0 0 16.55 16.55">
        <g id="copy" transform="translate(-2.479 -2.479)">
          <path id="Path_10040" data-name="Path 10040" d="M8,8,8,9.738A1.738,1.738,0,0,1,9.738,8h6.953a1.738,1.738,0,0,1,1.738,1.738v6.953a1.738,1.738,0,0,1-1.738,1.738H9.738A1.738,1.738,0,0,1,8,16.691Z" transform="translate(-0.723 -0.723)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path id="Path_10041" data-name="Path 10041" d="M14.429,7.476V5.738A1.738,1.738,0,0,0,12.691,4H5.738A1.738,1.738,0,0,0,4,5.738v6.953a1.738,1.738,0,0,0,1.738,1.738H7.476" transform="translate(-0.199 -0.199)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    ),
    CloseIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
        <path id="cross" d="M15.523,8.323l-.8-.8-3.2,3.2-3.2-3.2-.8.8,3.2,3.2-3.2,3.2.8.8,3.2-3.2,3.2,3.2.8-.8-3.2-3.2Z" transform="translate(-7.523 -7.523)" fill="#595c5c" />
      </svg>
    ),
    CrossWhiteIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6M9 9l6 6"></path></svg>),
    EyeIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16.99" height="11.641" viewBox="0 0 16.99 11.641">
        <g id="eye" transform="translate(-2.25 -5.25)">
          <path id="Path_10136" data-name="Path 10136" d="M10,12a2,2,0,1,0,2-2,2,2,0,0,0-2,2" transform="translate(-1.395 -0.93)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path id="Path_10137" data-name="Path 10137" d="M18.211,11.07q-3.042,5.07-7.605,5.07T3,11.07Q6.042,6,10.605,6t7.605,5.07" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    ),
    CheckCircleIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16.5" height="16.5" viewBox="0 0 16.5 16.5">
        <g id="Group_1681" data-name="Group 1681" transform="translate(-1.75 -1.75)">
          <path id="Path_9946" data-name="Path 9946" d="M10.5,10.5,3,10.5A7.5,7.5,0,1,0,10.5,3,7.5,7.5,0,0,0,3,10.5" transform="translate(-0.5 -0.5)" fill="rgba(255,255,255,0)" />
          <path id="Path_9946_-_Outline" data-name="Path 9946 - Outline" d="M10.5,18.75a8.25,8.25,0,1,1,8.25-8.25A8.2,8.2,0,0,1,10.5,18.75ZM3.75,10.5A6.75,6.75,0,1,0,10.5,3.75,6.706,6.706,0,0,0,3.75,10.5Z" transform="translate(-0.5 -0.5)" fill="#fff" />
          <path id="Path_9947" data-name="Path 9947" d="M9,11.667l1.667,1.667L14,10" transform="translate(-1.5 -1.667)" fill="rgba(255,255,255,0)" />
          <path id="Path_9947_-_Outline" data-name="Path 9947 - Outline" d="M10.667,14.083a.748.748,0,0,1-.53-.22L8.47,12.2A.75.75,0,1,1,9.53,11.136l1.136,1.136,2.8-2.8A.75.75,0,0,1,14.53,10.53L11.2,13.864A.748.748,0,0,1,10.667,14.083Z" transform="translate(-1.5 -1.667)" fill="#fff" />
        </g>
      </svg>
    ),
    PlusIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="12.372" height="12" viewBox="0 0 12.372 12">
        <g id="add_page" transform="translate(-554.113 -491.329)">
          <rect id="Rectangle_4141" data-name="Rectangle 4141" width="2" height="12" transform="translate(559.299 491.329)" fill="" />
          <rect id="Rectangle_4142" data-name="Rectangle 4142" width="2" height="12.372" transform="translate(566.486 496.064) rotate(90)" fill="" />
        </g>
      </svg>
    ),
    PopupArrow: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14.972" height="12.976" viewBox="0 0 14.972 12.976">
        <g id="popup_arrow" transform="translate(-317.522 -39.374)">
          <path id="Path_11" data-name="Path 11" d="M0,6.174l.449.471,5.476,5.7.991-.941L1.889,6.174,6.916.941,5.925,0,.449,5.7Z" transform="translate(332.24 51.975) rotate(179)" fill="#131517" stroke="#131517" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
          <path id="Path_9927" data-name="Path 9927" d="M0,6.174l.449.471,5.476,5.7.991-.941L1.889,6.174,6.916.941,5.925,0,.449,5.7Z" transform="translate(324.907 51.975) rotate(179)" fill="#131517" stroke="#131517" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
        </g>
      </svg>
    ),
    TextboxPlus: (
      <svg xmlns="http://www.w3.org/2000/svg" width="38" height="39" viewBox="0 0 38 39">
        <defs>
          <filter id="Rectangle_4187" x="0" y="0" width="38" height="39" filterUnits="userSpaceOnUse">
            <feOffset dy="3" />
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodOpacity="0.161" />
            <feComposite operator="in" in2="blur" />
            <feComposite in="SourceGraphic" />
          </filter>
        </defs>
        <g id="textbox_plus" transform="translate(9 6)">
          <g id="Group_802" data-name="Group 802">
            <g transform="matrix(1, 0, 0, 1, -9, -6)" filter="url(#Rectangle_4187)">
              <rect id="Rectangle_4187-2" data-name="Rectangle 4187" width="20" height="21" rx="5" transform="translate(9 6)" fill="#737577" />
            </g>
            <path id="popup_cross" d="M15.523,8.323l-.8-.8-3.2,3.2-3.2-3.2-.8.8,3.2,3.2-3.2,3.2.8.8,3.2-3.2,3.2,3.2.8-.8-3.2-3.2Z" transform="translate(10 -5.797) rotate(45)" fill="#dfe0e1" stroke="#dfe0e1" strokeWidth="1" />
          </g>
        </g>
      </svg>
    ),

    AgFont: (
      <svg xmlns="http://www.w3.org/2000/svg" width="39" height="40" viewBox="0 0 39 40">
        <text id="Ag" transform="translate(0 32)" fill="" fontSize="30" fontFamily="SegoeUI-Semibold, Segoe UI" fontWeight="600"><tspan x="0" y="0">Ag</tspan></text>
      </svg>
    ),
    AgFactoriaFont: (
      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="30" viewBox="0 0 44 30">
        <text id="Ag_factoria" transform="translate(0 20)" fill="" fontSize="30" fontFamily="Rockwell-Regular, Rockwell"><tspan x="0" y="0">Ag</tspan></text>
      </svg>
    ),
    AgIvyPprestoFont: (
      <svg xmlns="http://www.w3.org/2000/svg" width="39" height="40" viewBox="0 0 39 40">
        <text id="Ag_ivy_presto" transform="translate(0 32)" fill="" fontSize="30" fontFamily="SegoeUI-Semibold, Segoe UI" fontWeight="600"><tspan x="0" y="0">Ag</tspan></text>
      </svg>
    ),
    AgIvyModeFont: (
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="39" viewBox="0 0 34 39">
        <text id="Ag_ivy_mode" transform="translate(17 31)" fill="" fontSize="30" fontFamily="RobotoCondensed-Regular, Roboto Condensed"><tspan x="-16" y="0">Ag</tspan></text>
      </svg>
    ),
    AgAlverataFont: (
      <svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43">
        <text id="Ag_alverata" transform="translate(21 32)" fill="" fontSize="30" fontFamily="Poppins-Medium, Poppins" fontWeight="500"><tspan x="-20" y="0">Ag</tspan></text>
      </svg>
    ),
    AgRocGroteskFont: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="33" viewBox="0 0 40 33">
        <text id="Ag_roc_grotesk" transform="translate(20 27)" fill="" fontSize="30" fontFamily="Arial-BoldMT, Arial" fontWeight="700"><tspan x="-19" y="0">Ag</tspan></text>
      </svg>
    ),
    AgMuseoFont: (
      <svg xmlns="http://www.w3.org/2000/svg" width="41" height="38" viewBox="0 0 41 38">
        <text id="Ag_museo" transform="translate(0 29)" fill="" fontSize="30" fontFamily="Silom"><tspan x="0" y="0">Ag</tspan></text>
      </svg>),
    OneStar: (
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
        <defs>
          <linearGradient id="linear-gradient" x1="0.067" y1="0.75" x2="0.933" y2="0.25" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#ebb34d" />
            <stop offset="0.033" stopColor="#ebb64d" />
            <stop offset="0.178" stopColor="#eec04f" />
            <stop offset="0.551" stopColor="#f0cc50" />
            <stop offset="1" stopColor="#f3d652" />
          </linearGradient>
          <clipPath id="clipPath1">
            <circle id="Ellipse_2903" data-name="Ellipse 2903" cx="6" cy="6" r="6" transform="translate(64.569 350.638)" fill="url(#linear-gradient-1)" />
          </clipPath>
          <linearGradient id="linear-gradient-1" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#dd5f70" />
            <stop offset="0.162" stopColor="#dd636f" stopOpacity="0.969" />
            <stop offset="0.454" stopColor="#e48965" stopOpacity="0.643" />
            <stop offset="1" stopColor="#f3d652" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g id="_1star" data-name="1star" transform="translate(-64.569 -350.638)">
          <g id="Mask_Group_23" data-name="Mask Group 23" clipPath="url(#clipPath)">
            <g id="Group_1321" data-name="Group 1321">
              <g id="Group_115" data-name="Group 115" transform="translate(64.569 350.638)">
                <circle id="Ellipse_27" data-name="Ellipse 27" cx="6" cy="6" r="6" fill="url(#linear-gradient)" />
                <circle id="Ellipse_28" data-name="Ellipse 28" cx="6" cy="6" r="6" fill="url(#linear-gradient-3)" />
              </g>
              <g id="Group_119" data-name="Group 119" transform="translate(66.098 356.132)">
                <path id="Path_316" data-name="Path 316" d="M80.208,382.164a2.254,2.254,0,0,1,2.617,0" transform="translate(-77.045 -378.914)" fill="none" stroke="#5b0600" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.7" />
                <g id="Group_117" data-name="Group 117" transform="translate(1.51 -1)">
                  <ellipse id="Ellipse_31" data-name="Ellipse 31" cx="0.569" cy="0.932" rx="0.569" ry="0.932" transform="translate(0.142 0.405)" />
                  <line id="Line_40" data-name="Line 40" x2="1.455" y2="1.004" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.8" />
                </g>
                <g id="Group_118" data-name="Group 118" transform="translate(5.817 -1)">
                  <path id="Path_317" data-name="Path 317" d="M91.311,371.233c0,.515-.254.932-.569.932s-.569-.417-.569-.932.255-.932.569-.932S91.311,370.718,91.311,371.233Z" transform="translate(-89.838 -369.896)" />
                  <line id="Line_41" data-name="Line 41" x1="1.455" y2="1.004" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.8" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    ),
    TwoStar: (
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
        <defs>
          <linearGradient id="linear-gradient2" x1="0.067" y1="0.75" x2="0.933" y2="0.25" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#ebb34d" />
            <stop offset="0.033" stopColor="#ebb64d" />
            <stop offset="0.178" stopColor="#eec04f" />
            <stop offset="0.551" stopColor="#f0cc50" />
            <stop offset="1" stopColor="#f3d652" />
          </linearGradient>
          <clipPath id="clipPath2">
            <circle id="Ellipse_2902" data-name="Ellipse 2902" cx="6" cy="6" r="6" transform="translate(335.985 219.18)" fill="url(#linear-gradient-2)" />
          </clipPath>
        </defs>
        <g id="_2star" data-name="2star" transform="translate(-335.985 -219.18)">
          <g id="Mask_Group_22" data-name="Mask Group 22" clipPath="url(#clipPath)">
            <g id="Group_1320" data-name="Group 1320">
              <circle id="Ellipse_32" data-name="Ellipse 32" cx="6" cy="6" r="6" transform="translate(335.985 219.18)" fill="url(#linear-gradient)" />
              <g id="Group_121" data-name="Group 121" transform="translate(337.515 222.174)">
                <ellipse id="Ellipse_33" data-name="Ellipse 33" cx="0.569" cy="0.932" rx="0.569" ry="0.932" transform="translate(1.575 0)" />
                <ellipse id="Ellipse_34" data-name="Ellipse 34" cx="0.569" cy="0.932" rx="0.569" ry="0.932" transform="translate(6.076 0)" />
                <ellipse id="Ellipse_35" data-name="Ellipse 35" cx="1.072" cy="0.448" rx="1.072" ry="0.448" transform="translate(0 2.142)" fill="#dd8766" />
                <ellipse id="Ellipse_36" data-name="Ellipse 36" cx="1.072" cy="0.448" rx="1.072" ry="0.448" transform="translate(6.798 2.142)" fill="#dd8766" />
                <path id="Path_318" data-name="Path 318" d="M351.055,242.367a1.441,1.441,0,0,1,1.465-1.106,1.487,1.487,0,0,1,1.493,1.106" transform="translate(-348.063 -237.63)" fill="none" stroke="#5b0600" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    ),
    ThreeStar: (
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
        <defs>
          <linearGradient id="linear-gradient-3" x1="0.067" y1="0.75" x2="0.933" y2="0.25" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#ebb34d" />
            <stop offset="0.033" stopColor="#ebb64d" />
            <stop offset="0.178" stopColor="#eec04f" />
            <stop offset="0.551" stopColor="#f0cc50" />
            <stop offset="1" stopColor="#f3d652" />
          </linearGradient>
          <clipPath id="clipPath3">
            <circle id="Ellipse_2901" data-name="Ellipse 2901" cx="6" cy="6" r="6" transform="translate(335.985 350.638)" fill="url(#linear-gradient-3)" />
          </clipPath>
        </defs>
        <g id="_3star" data-name="3star" transform="translate(-335.985 -350.638)">
          <g id="Mask_Group_21" data-name="Mask Group 21" clipPath="url(#clipPath)">
            <g id="Group_1319" data-name="Group 1319">
              <circle id="Ellipse_37" data-name="Ellipse 37" cx="6" cy="6" r="6" transform="translate(335.985 350.638)" fill="url(#linear-gradient)" />
              <g id="Group_123" data-name="Group 123" transform="translate(337.515 354.383)">
                <ellipse id="Ellipse_38" data-name="Ellipse 38" cx="1.072" cy="0.448" rx="1.072" ry="0.448" transform="translate(0 1.391)" fill="#dd8766" />
                <ellipse id="Ellipse_39" data-name="Ellipse 39" cx="1.072" cy="0.448" rx="1.072" ry="0.448" transform="translate(6.798 1.391)" fill="#dd8766" />
                <path id="Path_319" data-name="Path 319" d="M346.8,363.706a.862.862,0,0,0-.886-.585.921.921,0,0,0-.887.585" transform="translate(-343.844 -363.121)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                <path id="Path_320" data-name="Path 320" d="M361.538,363.706a.862.862,0,0,0-.886-.585.921.921,0,0,0-.887.585" transform="translate(-354.16 -363.121)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                <path id="Path_321" data-name="Path 321" d="M350.106,374.254a10.1,10.1,0,0,0,3.279,0" transform="translate(-347.399 -370.914)" fill="none" stroke="#5b0600" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    ),
    FourStar: (
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
        <defs>
          <linearGradient id="linear-gradient-4" x1="0.067" y1="0.75" x2="0.933" y2="0.25" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#ebb34d" />
            <stop offset="0.033" stopColor="#ebb64d" />
            <stop offset="0.178" stopColor="#eec04f" />
            <stop offset="0.551" stopColor="#f0cc50" />
            <stop offset="1" stopColor="#f3d652" />
          </linearGradient>
          <clipPath id="clipPath4">
            <circle id="Ellipse_2899" data-name="Ellipse 2899" cx="5.898" cy="5.898" r="5.898" transform="matrix(1, 0.017, -0.017, 1, 200.503, 89.062)" fill="url(#linear-gradient-4)" />
          </clipPath>
          <clipPath id="clipPath-42">
            <path id="Path_323" data-name="Path 323" d="M209.314,110.273a24.841,24.841,0,0,1,6.682,0s.116,2.974-3.341,2.974S209.314,110.273,209.314,110.273Z" transform="translate(-209.313 -110.05)" fill="#5b0600" />
          </clipPath>
        </defs>
        <g id="_4star" data-name="4star" transform="translate(-200.297 -89.062)" clipPath="url(#clipPath4)">
          <g id="Group_1317" data-name="Group 1317">
            <circle id="Ellipse_40" data-name="Ellipse 40" cx="5.898" cy="5.898" r="5.898" transform="matrix(1, 0.017, -0.017, 1, 200.503, 89.062)" fill="url(#linear-gradient)" />
            <g id="Group_127" data-name="Group 127" transform="translate(201.902 92.107)">
              <ellipse id="Ellipse_41" data-name="Ellipse 41" cx="0.559" cy="0.916" rx="0.559" ry="0.916" transform="translate(1.549 0)" />
              <ellipse id="Ellipse_42" data-name="Ellipse 42" cx="0.559" cy="0.916" rx="0.559" ry="0.916" transform="translate(5.972 0)" />
              <ellipse id="Ellipse_43" data-name="Ellipse 43" cx="1.054" cy="0.44" rx="1.054" ry="0.44" transform="translate(0 2.106)" fill="#dd8766" />
              <ellipse id="Ellipse_44" data-name="Ellipse 44" cx="1.054" cy="0.44" rx="1.054" ry="0.44" transform="translate(6.682 2.106)" fill="#dd8766" />
              <g id="Group_126" data-name="Group 126" transform="translate(1.054 3.145)">
                <path id="Path_322" data-name="Path 322" d="M209.314,110.273a24.841,24.841,0,0,1,6.682,0s.116,2.974-3.341,2.974S209.314,110.273,209.314,110.273Z" transform="translate(-209.313 -110.05)" fill="#5b0600" />
                <g id="Group_125" data-name="Group 125" clipPath="url(#clipPath-2)">
                  <ellipse id="Ellipse_45" data-name="Ellipse 45" cx="2.835" cy="1.464" rx="2.835" ry="1.464" transform="translate(0.506 1.733)" fill="#8e1112" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    ),
    FiveStar: (
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
        <defs>
          <linearGradient id="linear-gradient-5" x1="0.067" y1="0.75" x2="0.933" y2="0.25" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#ebb34d" />
            <stop offset="0.033" stopColor="#ebb64d" />
            <stop offset="0.178" stopColor="#eec04f" />
            <stop offset="0.551" stopColor="#f0cc50" />
            <stop offset="1" stopColor="#f3d652" />
          </linearGradient>
          <clipPath id="clipPath5">
            <circle id="Ellipse_2900" data-name="Ellipse 2900" cx="6" cy="6" r="6" transform="translate(335.986 89.408)" fill="url(#linear-gradient-5)" />
          </clipPath>
          <clipPath id="clipPath-6">
            <path id="Path_325" data-name="Path 325" d="M344.656,110.277a25.271,25.271,0,0,1,6.8,0s.118,3.025-3.4,3.025S344.656,110.277,344.656,110.277Z" transform="translate(-344.655 -110.05)" fill="#5b0600" />
          </clipPath>
          <linearGradient id="linear-gradient-6" x1="20.514" y1="52.666" x2="21.528" y2="52.666" gradientUnits="objectBoundingBox">
            <stop offset="0.004" stopColor="#d2254d" />
            <stop offset="1" stopColor="#d65c4e" />
          </linearGradient>
          <linearGradient id="linear-gradient-7" x1="-333.887" y1="-42.905" x2="-332.873" y2="-42.905" />
        </defs>
        <g id="_5star" data-name="5star" transform="translate(-335.986 -89.408)">
          <g id="Mask_Group_20" data-name="Mask Group 20" clipPath="url(#clipPath)">
            <g id="Group_1318" data-name="Group 1318">
              <circle id="Ellipse_46" data-name="Ellipse 46" cx="6" cy="6" r="6" transform="translate(335.986 89.408)" fill="url(#linear-gradient)" />
              <g id="Group_131" data-name="Group 131" transform="translate(337.515 91.708)">
                <ellipse id="Ellipse_47" data-name="Ellipse 47" cx="1.072" cy="0.448" rx="1.072" ry="0.448" transform="translate(0 2.586)" fill="#dd8766" />
                <ellipse id="Ellipse_48" data-name="Ellipse 48" cx="1.072" cy="0.448" rx="1.072" ry="0.448" transform="translate(6.798 2.586)" fill="#dd8766" />
                <g id="Group_130" data-name="Group 130" transform="translate(1.072 3.892)">
                  <path id="Path_324" data-name="Path 324" d="M344.656,110.277a25.271,25.271,0,0,1,6.8,0s.118,3.025-3.4,3.025S344.656,110.277,344.656,110.277Z" transform="translate(-344.655 -110.05)" fill="#5b0600" />
                  <g id="Group_129" data-name="Group 129" clipPath="url(#clipPath-2)">
                    <ellipse id="Ellipse_49" data-name="Ellipse 49" cx="2.884" cy="1.489" rx="2.884" ry="1.489" transform="translate(0.515 1.763)" fill="#8e1112" />
                  </g>
                </g>
                <path id="Path_326" data-name="Path 326" d="M344.13,97.1a.841.841,0,0,1-1.5.386.762.762,0,0,0-.56.945c.15.585.9.89,2,1.537.646-1.092,1.162-1.723,1.012-2.308a.762.762,0,0,0-.945-.56Z" transform="translate(-341.753 -97.076)" fillRule="evenodd" fill="url(#linear-gradient-3)" />
                <path id="Path_327" data-name="Path 327" d="M360.441,97.1a.762.762,0,0,0-.945.56c-.15.585.365,1.216,1.012,2.308,1.092-.646,1.847-.952,2-1.537a.762.762,0,0,0-.559-.945.841.841,0,0,1-1.5-.386Z" transform="translate(-353.953 -97.076)" fillRule="evenodd" fill="url(#linear-gradient-4)" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    ),
    Clock: (
      <svg xmlns="http://www.w3.org/2000/svg" id="timer" width="16" height="16" viewBox="0 0 16 16">
        <g id="Group_1021" data-name="Group 1021" transform="translate(-1.802 -0.802)">
          <path id="Path_9939" data-name="Path 9939" d="M9.206,9.206,3,9.206A6.206,6.206,0,1,0,9.206,3,6.206,6.206,0,0,0,3,9.206" transform="translate(0.626 -0.295)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
          <path id="Path_9940" data-name="Path 9940" d="M12,12l2.6,1.735" transform="translate(-2.398 -3.234)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
          <path id="Path_9941" data-name="Path 9941" d="M12,7v4.338" transform="translate(-2.169 -2.005)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
        </g>
      </svg>
    ),
    Setting: (
      <svg xmlns="http://www.w3.org/2000/svg" id="filter_subcategory" width="31.778" height="31.778" viewBox="0 0 31.778 31.778">
        <path id="Path_10074" data-name="Path 10074" d="M4,8H9.3v5.3H4Z" transform="translate(1.296 2.593)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10075" data-name="Path 10075" d="M6,4V9.3" transform="translate(1.945 1.296)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10076" data-name="Path 10076" d="M6,12V22.593" transform="translate(1.945 3.889)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10077" data-name="Path 10077" d="M10,14h5.3v5.3H10Z" transform="translate(3.241 4.537)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10078" data-name="Path 10078" d="M12,4V17.241" transform="translate(3.889 1.296)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10079" data-name="Path 10079" d="M12,18v2.648" transform="translate(3.889 5.834)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10080" data-name="Path 10080" d="M16,5h5.3v5.3H16Z" transform="translate(5.185 1.62)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10081" data-name="Path 10081" d="M18,4V5.324" transform="translate(5.834 1.296)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10082" data-name="Path 10082" d="M18,9V23.565" transform="translate(5.834 2.917)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    ),
    SelectFilter: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14.605" height="14.568" viewBox="0 0 14.605 14.568">
        <path id="select_category_filter" d="M165.569-785.432a.881.881,0,0,1-.649-.262.881.881,0,0,1-.262-.649v-5.463l-5.281-6.737a.867.867,0,0,1-.1-.956.846.846,0,0,1,.831-.5h12.747a.846.846,0,0,1,.831.5.867.867,0,0,1-.1.956l-5.281,6.737v5.463a.881.881,0,0,1-.262.649.881.881,0,0,1-.649.262Zm.91-7.011,4.507-5.736h-9.014ZM166.479-792.443Z" transform="translate(-159.176 800)" fill="" />
      </svg>
    ),
    UpdateHost: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="53"
        height="53"
        viewBox="0 0 53 53"
      >
        <g id="tech_support" transform="translate(-24 43)">
          <rect
            id="Rectangle_4144"
            data-name="Rectangle 4144"
            width="53"
            height="53"
            rx="26.5"
            transform="translate(24 -43)"
            fill="#efefef"
          />
          <g id="update_host" transform="translate(36, -32)">
            <ellipse id="Ellipse_2867" data-name="Ellipse 2867" cx="6.5" cy="6" rx="6.5" ry="6" transform="translate(8 3.57)" fill="#b1b1b1" />
            <path id="Path_9901" data-name="Path 9901" d="M27.033,25.781a1.252,1.252,0,0,1-2.5,0c0-3.743-2.211-5.007-8.761-5.007h-2.5c-6.55,0-8.761,1.264-8.761,5.007a1.252,1.252,0,0,1-2.5,0c0-7.51,7.328-7.51,11.265-7.51h2.5C19.705,18.271,27.033,18.271,27.033,25.781ZM7.007,9.51a7.51,7.51,0,1,1,7.51,7.51A7.518,7.518,0,0,1,7.007,9.51Zm2.5,0A5.007,5.007,0,1,0,14.516,4.5,5.012,5.012,0,0,0,9.51,9.51Z" fill="#969498" />
          </g>

        </g>
      </svg>
    ),
    CustomQuestion: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20.5" viewBox="0 0 20 20.5">
        <g id="custom_question" data-name="custom question" transform="translate(0 0.5)">
          <path id="Path_10148" data-name="Path 10148" d="M0,0H20V20H0Z" fill="none" />
          <path id="Path_10149" data-name="Path 10149" d="M9.582,1.381a2.938,2.938,0,0,1,2.723-.089l.171.089,6.1,3.677.086.058.083.071.1.069A2.982,2.982,0,0,1,19.979,7.27L20,7.456l0,.188v6.7a2.971,2.971,0,0,1-1.309,2.479l-.153.092-6.123,3.96a2.892,2.892,0,0,1-2.7.063l-.176-.092-6.025-3.9a2.974,2.974,0,0,1-1.5-2.411L2,14.348V7.643a2.976,2.976,0,0,1,1.328-2.49L9.583,1.381ZM11,13.886a.907.907,0,0,0-.894.813l-.006.108.006.117a.9.9,0,0,0,1.787,0l.006-.108-.006-.117A.907.907,0,0,0,11,13.886Zm1.231-6.142a2.641,2.641,0,0,0-3.268.67.936.936,0,0,0,.061,1.261.886.886,0,0,0,1.235.011l.154-.166a.867.867,0,0,1,1-.138.927.927,0,0,1,.479.985.909.909,0,0,1-.785.751l-.209.011a.922.922,0,0,0,.1,1.835,2.713,2.713,0,0,0,2.633-2.113A2.783,2.783,0,0,0,12.231,7.744Z" transform="translate(-0.5 -1.5)" fill="#5f6061" stroke="" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    ),
    MaxCapacity: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14.55" height="29.102" viewBox="0 0 14.55 29.102">
        <g id="max_capacity" transform="translate(-21 -20)">
          <path id="Path_10095" data-name="Path 10095" d="M21,43.3a1.455,1.455,0,0,0,.427,1.028,1.489,1.489,0,0,0,2.057,0L26.82,41V54.945H22.94a1.455,1.455,0,1,0,0,2.91H33.611a1.455,1.455,0,0,0,0-2.91H29.73V41l3.337,3.337a1.489,1.489,0,0,0,2.057,0,1.455,1.455,0,0,0,0-2.057L30.962,38.11a3.8,3.8,0,0,0-5.369,0l-4.166,4.166A1.455,1.455,0,0,0,21,43.3Z" transform="translate(0 -8.754)" fill="#969498" />
          <path id="Path_10096" data-name="Path 10096" d="M34.126,22.91a1.455,1.455,0,0,0,0-2.91H23.455a1.455,1.455,0,0,0,0,2.91Z" transform="translate(-0.515)" fill="#969498" />
        </g>
      </svg>
    ),
    Download: (
      <svg xmlns="http://www.w3.org/2000/svg" id="download" width="17.762" height="17.762" viewBox="0 0 17.762 17.762">
        <path id="Path_9797" data-name="Path 9797" d="M4,17v1.48a1.48,1.48,0,0,0,1.48,1.48h8.881a1.48,1.48,0,0,0,1.48-1.48V17" transform="translate(-1.04 -4.419)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_9798" data-name="Path 9798" d="M7,11l3.7,3.7L14.4,11" transform="translate(-1.819 -2.859)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_9799" data-name="Path 9799" d="M12,4v8.881" transform="translate(-3.119 -1.04)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    ),
    DownloadWhite: (
      <svg xmlns="http://www.w3.org/2000/svg" id="download" width="17.762" height="17.762" viewBox="0 0 17.762 17.762">
  <path id="Path_9796" data-name="Path 9796" d="M0,0H17.762V17.762H0Z" fill="none"/>
  <path id="Path_9797" data-name="Path 9797" d="M4,17v1.48a1.48,1.48,0,0,0,1.48,1.48h8.881a1.48,1.48,0,0,0,1.48-1.48V17" transform="translate(-1.04 -4.419)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
  <path id="Path_9798" data-name="Path 9798" d="M7,11l3.7,3.7L14.4,11" transform="translate(-1.819 -2.859)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
  <path id="Path_9799" data-name="Path 9799" d="M12,4v8.881" transform="translate(-3.119 -1.04)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
</svg>
    ),
    FullView: (
      <svg xmlns="http://www.w3.org/2000/svg" id="full_view" width="19.762" height="19.762" viewBox="0 0 19.762 19.762">
        <path id="Path_9801" data-name="Path 9801" d="M3,16m0,.823A.823.823,0,0,1,3.823,16h2.47a.823.823,0,0,1,.823.823v2.47a.823.823,0,0,1-.823.823H3.823A.823.823,0,0,1,3,19.294Z" transform="translate(-0.53 -2.826)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_9802" data-name="Path 9802" d="M4,10.587V5.647A1.647,1.647,0,0,1,5.647,4h9.881a1.647,1.647,0,0,1,1.647,1.647v9.881a1.647,1.647,0,0,1-1.647,1.647h-4.94" transform="translate(-0.706 -0.706)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_9803" data-name="Path 9803" d="M12,8h3.294v3.294" transform="translate(-2.119 -1.413)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_9804" data-name="Path 9804" d="M15.117,8,11,12.117" transform="translate(-1.943 -1.413)" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    ),
    Filter: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14.605" height="14.568" viewBox="0 0 14.605 14.568">
        <path id="filter_icon" d="M165.569-785.432a.881.881,0,0,1-.649-.262.881.881,0,0,1-.262-.649v-5.463l-5.281-6.737a.867.867,0,0,1-.1-.956.846.846,0,0,1,.831-.5h12.747a.846.846,0,0,1,.831.5.867.867,0,0,1-.1.956l-5.281,6.737v5.463a.881.881,0,0,1-.262.649.881.881,0,0,1-.649.262Zm.91-7.011,4.507-5.736h-9.014ZM166.479-792.443Z" transform="translate(-159.176 800)" fill="" />
      </svg>
    ),
    ColumnIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="13.091" height="16" viewBox="0 0 13.091 16">
        <g id="column" transform="translate(-53.117 -8)">
          <g id="Rectangle_4319" data-name="Rectangle 4319" transform="translate(56.22 8)" fill="" stroke="" strokeWidth="1">
            <rect width="1.51" height="16" stroke="none" />
            <rect x="0.5" y="0.5" width="0.51" height="15" fill="none" />
          </g>
          <g id="Rectangle_4320" data-name="Rectangle 4320" transform="translate(66.208 10.5) rotate(90)" fill="" stroke="" strokeWidth="1">
            <rect width="1.509" height="13.091" stroke="none" />
            <rect x="0.5" y="0.5" width="0.509" height="12.091" fill="none" />
          </g>
          <g id="Rectangle_4321" data-name="Rectangle 4321" transform="translate(66.208 15) rotate(90)" fill="" stroke="" strokeWidth="1">
            <rect width="1.51" height="13.091" stroke="none" />
            <rect x="0.5" y="0.5" width="0.51" height="12.091" fill="none" />
          </g>
          <g id="Rectangle_4322" data-name="Rectangle 4322" transform="translate(66.208 19.5) rotate(90)" fill="" stroke="" strokeidth="1">
            <rect width="1.51" height="13.091" stroke="none" />
            <rect x="0.5" y="0.5" width="0.51" height="12.091" fill="none" />
          </g>
        </g>
      </svg>
    ),
    EnterEmail: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14.659" height="14.659" viewBox="0 0 14.659 14.659">
        <g id="enter_emails" transform="translate(-23.2 -23.2)">
          <path id="Path_9817" data-name="Path 9817" d="M28.888,23.2H26.755A3.548,3.548,0,0,0,23.2,26.755V34.3a3.548,3.548,0,0,0,3.555,3.555H34.3A3.548,3.548,0,0,0,37.859,34.3h0V32.17a.82.82,0,0,0-1.641,0V34.3A1.9,1.9,0,0,1,34.3,36.218H26.755A1.9,1.9,0,0,1,24.841,34.3V26.755a1.9,1.9,0,0,1,1.914-1.914h2.133a.82.82,0,1,0,0-1.641Z" fill="#8e9292" />
          <path id="Path_9818" data-name="Path 9818" d="M39.171,30.327l-.766,2.735a.824.824,0,0,0,.547,1.012,1.177,1.177,0,0,0,.438,0l2.735-.766a.572.572,0,0,0,.356-.191l5.579-5.606a2.225,2.225,0,0,0-3.145-3.145l-5.552,5.606A.572.572,0,0,0,39.171,30.327Zm6.946-4.786a.58.58,0,0,1,.82.82l-4.977,4.977-.82-.82Zm-5.743,6.536Z" transform="translate(-11.021 -0.4)" fill="#8e9292" />
        </g>
      </svg>
    ),
    ImportIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" id="import_csv" width="40.02" height="40.02" viewBox="0 0 40.02 40.02">
        <path id="Path_9819" data-name="Path 9819" d="M0,0H40.02V40.02H0Z" fill="none" />
        <path id="Path_9820" data-name="Path 9820" d="M11.67,5H8.335A3.335,3.335,0,0,0,5,8.335v20.01A3.335,3.335,0,0,0,8.335,31.68H25.01a3.335,3.335,0,0,0,3.335-3.335V8.335A3.335,3.335,0,0,0,25.01,5H21.675" transform="translate(3.337 3.337)" fill="none" stroke="#7c7c7d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        <path id="Path_9821" data-name="Path 9821" d="M9,3,9,6.335A3.335,3.335,0,0,1,12.335,3H15.67A3.335,3.335,0,0,1,19,6.335h0A3.335,3.335,0,0,1,15.67,9.67H12.335A3.335,3.335,0,0,1,9,6.335Z" transform="translate(6.007 2.002)" fill="none" stroke="#7c7c7d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        <path id="Path_9822" data-name="Path 9822" d="M9,12H19" transform="translate(6.007 8.01)" fill="none" stroke="#7c7c7d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        <path id="Path_9823" data-name="Path 9823" d="M9,16H19" transform="translate(6.007 10.68)" fill="none" stroke="#7c7c7d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      </svg>
    ),
    Globe: (
      <svg xmlns="http://www.w3.org/2000/svg" width="13.732" height="13.732" viewBox="0 0 13.732 13.732">
        <g id="noun-web-3875619" transform="translate(-1 -1)">
          <path id="Path_4" data-name="Path 4" d="M7.866,1a6.866,6.866,0,1,0,6.866,6.866A6.866,6.866,0,0,0,7.866,1Zm5.581,6.242H10.974A11.6,11.6,0,0,0,9.94,2.65a5.629,5.629,0,0,1,3.507,4.592ZM7.866,13.484c-.716,0-1.736-1.925-1.86-4.993h3.72C9.6,11.559,8.582,13.484,7.866,13.484ZM6.006,7.242c.125-3.068,1.144-4.993,1.86-4.993S9.6,4.173,9.726,7.242ZM5.792,2.65A11.6,11.6,0,0,0,4.758,7.242H2.285A5.629,5.629,0,0,1,5.792,2.65ZM2.285,8.49H4.758a11.6,11.6,0,0,0,1.034,4.592A5.63,5.63,0,0,1,2.285,8.49ZM9.94,13.082A11.6,11.6,0,0,0,10.974,8.49h2.472A5.63,5.63,0,0,1,9.94,13.082Z" fill="#595c5c" />
        </g>
      </svg>
    ),
    NameUserIcon: (
      <svg id="first_name" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
        <path id="Path_10102" data-name="Path 10102" d="M0,0H22V22H0Z" fill="none" />
        <path id="Path_10103" data-name="Path 10103" d="M8,6.667A3.667,3.667,0,1,0,11.667,3,3.667,3.667,0,0,0,8,6.667" transform="translate(-0.667 -0.25)" fill="none" stroke="#5f6061" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10104" data-name="Path 10104" d="M6,20.5V18.667A3.667,3.667,0,0,1,9.667,15h3.208" transform="translate(-0.5 -1.25)" fill="none" stroke="#5f6061" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10105" data-name="Path 10105" d="M18.135,15.559a1.925,1.925,0,0,1,2.722,2.723L17.75,21.416H15v-2.75Z" transform="translate(-1.25 -1.25)" fill="none" stroke="#5f6061" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    ),

    QRCodeIcon: (
      <svg id="qr" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path id="Path_10122" data-name="Path 10122" d="M0,0H24V24H0Z" fill="none" />
        <path id="Path_10123" data-name="Path 10123" d="M4,4,4,5A1,1,0,0,1,5,4H9a1,1,0,0,1,1,1V9a1,1,0,0,1-1,1H5A1,1,0,0,1,4,9Z" fill="none" stroke="#5f6061" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10124" data-name="Path 10124" d="M7,17v.01" fill="none" stroke="#5f6061" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10125" data-name="Path 10125" d="M14,4m0,1a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1V9a1,1,0,0,1-1,1H15a1,1,0,0,1-1-1Z" fill="none" stroke="#5f6061" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10126" data-name="Path 10126" d="M7,7v.01" fill="none" stroke="#5f6061" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10127" data-name="Path 10127" d="M4,14m0,1a1,1,0,0,1,1-1H9a1,1,0,0,1,1,1v4a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1Z" fill="none" stroke="#5f6061" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10128" data-name="Path 10128" d="M17,7v.01" fill="none" stroke="#5f6061" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10129" data-name="Path 10129" d="M14,14h3" fill="none" stroke="#5f6061" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10130" data-name="Path 10130" d="M20,14v.01" fill="none" stroke="#5f6061" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10131" data-name="Path 10131" d="M14,14v3" fill="none" stroke="#5f6061" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10132" data-name="Path 10132" d="M14,20h3" fill="none" stroke="#5f6061" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10133" data-name="Path 10133" d="M17,17h3" fill="none" stroke="#5f6061" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10134" data-name="Path 10134" d="M20,17v3" fill="none" stroke="#5f6061" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    ),

    DateCalenderIcon: (
      <svg id="date_field" xmlns="http://www.w3.org/2000/svg" width="16" height="18.222" viewBox="0 0 16 18.222">
        <path id="calendar_icon" d="M153.337,48.446h.889A1.778,1.778,0,0,1,156,50.223V62.668a1.778,1.778,0,0,1-1.778,1.778H141.782A1.778,1.778,0,0,1,140,62.668V50.223a1.778,1.778,0,0,1,1.778-1.778h.889v-.889a.889.889,0,0,1,1.778,0v.889h7.111v-.889a.889.889,0,0,1,1.778,0Zm.889,3.111V52.89H141.782v9.778h12.444Zm-10.667,3.111h3.556v3.556h-3.556Z" transform="translate(-140.004 -46.668)" fill="#5f6061" />
      </svg>
    ),
    ForgotPasswordIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18.59" height="27.31" viewBox="0 0 18.59 27.31">
        <g id="forgot_password" transform="translate(-26.93 -11.75)">
          <path id="Path_10155" data-name="Path 10155" d="M26.93,25.47V36.9a2.164,2.164,0,0,0,2.16,2.16H43.36a2.164,2.164,0,0,0,2.16-2.16V25.47a2.164,2.164,0,0,0-2.16-2.16H29.09A2.157,2.157,0,0,0,26.93,25.47ZM36.22,37.1a1,1,0,1,1,1-1A1,1,0,0,1,36.22,37.1ZM34.11,26.04a3.289,3.289,0,1,1,4.18,5.08,2.87,2.87,0,0,0-1.06,2.25,1,1,0,0,1-2,0,4.842,4.842,0,0,1,1.81-3.8,1.294,1.294,0,0,0-.57-2.28,1.289,1.289,0,0,0-1.07.28,1.31,1.31,0,0,0-.46.99,1,1,0,0,1-2,0A3.232,3.232,0,0,1,34.11,26.04Z" fill="#969498" />
          <path id="Path_10156" data-name="Path 10156" d="M43.36,21.31c.08,0,.16.02.24.02v-2.2a7.38,7.38,0,0,0-14.76,0v2.2c.08,0,.16-.02.24-.02h1.76V19.14a5.38,5.38,0,0,1,10.76,0v2.17Z" fill="#969498" />
        </g>
      </svg>
    ),
    HostImg: (
      <svg id="hosted_by" xmlns="http://www.w3.org/2000/svg" width="17.282" height="17.282" viewBox="0 0 17.282 17.282">
        <path id="Path_9952" data-name="Path 9952" d="M0,0H17.282V17.282H0Z" fill="none" />
        <path id="Path_9953" data-name="Path 9953" d="M11.16,11.321A2.16,2.16,0,1,0,9,9.16,2.16,2.16,0,0,0,11.16,11.321Z" transform="translate(-2.519 -1.959)" fill="none" stroke="#131517" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
        <path id="Path_9954" data-name="Path 9954" d="M6.2,17.976A2.88,2.88,0,0,1,8.937,16h2.88a2.88,2.88,0,0,1,2.735,1.974" transform="translate(-1.736 -4.478)" fill="none" stroke="#131517" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
        <path id="Path_9955" data-name="Path 9955" d="M15.152,5.075a1.6,1.6,0,0,1,.81,1.4v5.245a1.6,1.6,0,0,1-.834,1.4L10.267,16.2a1.634,1.634,0,0,1-1.573,0L3.834,13.126A1.6,1.6,0,0,1,3,11.723V6.477a1.6,1.6,0,0,1,.834-1.4L8.695,2.209a1.678,1.678,0,0,1,1.62,0l4.861,2.866h-.024Z" transform="translate(-0.84 -0.56)" fill="none" stroke="#131517" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
      </svg>
    ),
    LinkSvgIcon: (
      <svg id="url_link" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path id="Path_9948" data-name="Path 9948" d="M0,0H24V24H0Z" fill="none" />
        <path id="Path_9949" data-name="Path 9949" d="M9,15l6-6" fill="none" stroke="#595c5c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_9950" data-name="Path 9950" d="M11,6l.463-.536a5,5,0,1,1,7.071,7.072L18,13" fill="none" stroke="#595c5c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_9951" data-name="Path 9951" d="M13,18l-.4.534a5.068,5.068,0,0,1-7.127,0,4.972,4.972,0,0,1,0-7.071L6,11" fill="none" stroke="#595c5c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    ),
    EventSettingsIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" id="event_setting" width="24" height="24" viewBox="0 0 24 24">
        <path id="Path_10068" data-name="Path 10068" d="M4,5,4,7A2,2,0,0,1,6,5H18a2,2,0,0,1,2,2V19a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2Z" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10069" data-name="Path 10069" d="M16,3V7" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10070" data-name="Path 10070" d="M8,3V7" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10071" data-name="Path 10071" d="M4,11H20" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_10072" data-name="Path 10072" d="M8,15h2v2H8Z" fill="none" stroke="" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg>
    ),
    SubCategoryIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53">
        <g id="tech_support" transform="translate(-24 43)">
          <rect id="Rectangle_4144" data-name="Rectangle 4144" width="53" height="53" rx="26.5" transform="translate(24 -43)" fill="#efefef"></rect>
          <g id="noun-support-1058618" transform="translate(34 -33)">
            <path id="Path_10008" data-name="Path 10008" d="M0,0H33.343V33.343H0Z" fill="none"></path>
            <path id="Path_10009" data-name="Path 10009" d="M14,4h8.9v8.9H14Z" transform="translate(5.015 1.433)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"></path>
            <path id="Path_10010" data-name="Path 10010" d="M4,14h8.9v8.9H4Z" transform="translate(1.433 5.015)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"></path>
            <path id="Path_10011" data-name="Path 10011" d="M18.448,18.448m-4.448,0A4.448,4.448,0,1,0,18.448,14,4.448,4.448,0,0,0,14,18.448" transform="translate(5.015 5.015)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"></path>
            <path id="Path_10012" data-name="Path 10012" d="M8.448,8.448,4,8.448A4.448,4.448,0,1,0,8.448,4,4.448,4.448,0,0,0,4,8.448" transform="translate(1.433 1.433)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"></path>
          </g>
        </g>
      </svg>
    ),
    BackArrow: (
      <svg xmlns="http://www.w3.org/2000/svg" id="back" width="38" height="34" viewBox="0 0 38 34">
        <g id="Path_9957" data-name="Path 9957" fill="#fff" opacity="0">
          <path d="M 37.5 33.5 L 0.5 33.5 L 0.5 0.5 L 37.5 0.5 L 37.5 33.5 Z" stroke="none" />
          <path d="M 1 1 L 1 33 L 37 33 L 37 1 L 1 1 M 0 0 L 38 0 L 38 34 L 0 34 L 0 0 Z" stroke="none" fill="#707070" />
        </g>
        <path id="back_arrow" d="M13.412,2.007l-9.384,9.5,9.384,9.731-1.9,1.778L0,11.509,11.509,0Z" transform="translate(13.895 6.373)" fill="#131517" />
      </svg>
    ),
    Facebook: (
      <svg xmlns="http://www.w3.org/2000/svg" id="fb_icon" width="20" height="20" viewBox="0 0 20 20">
        <path id="Path_1970" data-name="Path 1970" d="M10,0A10,10,0,1,0,20,10,10,10,0,0,0,10,0Z" fill="#969498" />
        <path id="Path_1971" data-name="Path 1971" d="M13.092,19.111h2.482V13.1H17.23l.219-2.07H15.575l0-1.036c0-.54.051-.829.826-.829h1.035V7.1H15.782c-1.99,0-2.69,1-2.69,2.694v1.243h-1.24V13.1h1.24v6.007Z" transform="translate(-4.352 -3.133)" fill="#fff" />
      </svg>
    ),
    Linkedin: (
      <svg xmlns="http://www.w3.org/2000/svg" id="linkedin" width="20" height="20" viewBox="0 0 20 20">
        <g id="Group_1671" data-name="Group 1671">
          <path id="Path_9726" data-name="Path 9726" d="M10,0A10,10,0,1,0,20,10,10,10,0,0,0,10,0ZM7.4,13.923H5.363V7.786H7.4ZM6.382,6.948H6.369A1.063,1.063,0,1,1,6.4,4.827a1.064,1.064,0,1,1-.013,2.121Zm8.376,6.976h-2.04V10.639c0-.825-.3-1.388-1.034-1.388A1.116,1.116,0,0,0,10.638,10a1.4,1.4,0,0,0-.068.5v3.427H8.531s.027-5.561,0-6.137h2.04v.869A2.025,2.025,0,0,1,12.41,7.641c1.342,0,2.348.878,2.348,2.762v3.519Z" fill="#969498" />
        </g>
      </svg>
    ),
    Twitter: (
      <svg xmlns="http://www.w3.org/2000/svg" id="twitter" width="20" height="20" viewBox="0 0 20 20">
        <g id="twitter-2" data-name="twitter">
          <circle id="Ellipse_484" data-name="Ellipse 484" cx="10" cy="10" r="10" fill="#969498" />
          <rect id="Rectangle_4193" data-name="Rectangle 4193" width="11.111" height="10.556" transform="translate(4.444 5)" fill="#fff" />
          <g id="_11053969_x_logo_twitter_new_brand_icon_1_" data-name="11053969_x_logo_twitter_new_brand_icon (1)" transform="translate(3.889 3.889)">
            <path id="Path_9976" data-name="Path 9976" d="M9.384,8.2,7.125,5.041H5.92l2.8,3.914.352.492L11.465,12.8h1.2L9.734,8.694Z" transform="translate(-3.187 -2.796)" fill="#969498" />
            <path id="Path_9977" data-name="Path 9977" d="M12.2,1H2.022A1.022,1.022,0,0,0,1,2.022V12.2a1.022,1.022,0,0,0,1.022,1.022H12.2A1.022,1.022,0,0,0,13.222,12.2V2.022A1.022,1.022,0,0,0,12.2,1ZM8.909,11.556,6.485,8.1,3.451,11.556H2.667l3.47-3.947L2.667,2.667H5.314L7.608,5.934l2.875-3.268h.784L7.958,6.431l3.6,5.125Z" transform="translate(-1 -1)" fill="#969498" />
          </g>
        </g>
      </svg>
    ),
    Website: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
        <g id="website" transform="translate(-477 -142.731)">
          <circle id="Ellipse_2904" data-name="Ellipse 2904" cx="10" cy="10" r="10" transform="translate(477 142.731)" fill="#969498" />
          <g id="noun-web-3875619" transform="translate(479 144.731)">
            <path id="Path_4" data-name="Path 4" d="M7.866,1a6.866,6.866,0,1,0,6.866,6.866A6.866,6.866,0,0,0,7.866,1Zm5.581,6.242H10.974A11.6,11.6,0,0,0,9.94,2.65a5.629,5.629,0,0,1,3.507,4.592ZM7.866,13.484c-.716,0-1.736-1.925-1.86-4.993h3.72C9.6,11.559,8.582,13.484,7.866,13.484ZM6.006,7.242c.125-3.068,1.144-4.993,1.86-4.993S9.6,4.173,9.726,7.242ZM5.792,2.65A11.6,11.6,0,0,0,4.758,7.242H2.285A5.629,5.629,0,0,1,5.792,2.65ZM2.285,8.49H4.758a11.6,11.6,0,0,0,1.034,4.592A5.63,5.63,0,0,1,2.285,8.49ZM9.94,13.082A11.6,11.6,0,0,0,10.974,8.49h2.472A5.63,5.63,0,0,1,9.94,13.082Z" fill="#fff" />
          </g>
        </g>
      </svg>
    ),
    Register: (
      <svg xmlns="http://www.w3.org/2000/svg" id="register" width="21.697" height="21.697" viewBox="0 0 21.697 21.697">
        <path id="Path_9746" data-name="Path 9746" d="M0,0H21.7V21.7H0Z" fill="none" />
        <path id="Path_9747" data-name="Path 9747" d="M15,5V6.808" transform="translate(-1.439 -0.48)" fill="none" stroke="#595c5c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_9748" data-name="Path 9748" d="M15,11v1.808" transform="translate(-1.439 -1.055)" fill="none" stroke="#595c5c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_9749" data-name="Path 9749" d="M15,17v1.808" transform="translate(-1.439 -1.631)" fill="none" stroke="#595c5c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path id="Path_9750" data-name="Path 9750" d="M4.808,5H17.465a1.808,1.808,0,0,1,1.808,1.808V9.52a1.808,1.808,0,0,0,0,3.616v2.712a1.808,1.808,0,0,1-1.808,1.808H4.808A1.808,1.808,0,0,1,3,15.849V13.136A1.808,1.808,0,0,0,3,9.52V6.808A1.808,1.808,0,0,1,4.808,5" transform="translate(-0.288 -0.48)" fill="none" stroke="#595c5c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    ),
    FeedbackEmail: (
      <svg xmlns="http://www.w3.org/2000/svg" id="feedback_email" width="24" height="24" viewBox="0 0 24 24">
        <path id="Path_10083" data-name="Path 10083" d="M0,0H24V24H0Z" fill="none" />
        <path id="reviews_FILL0_wght400_GRAD0_opsz24" d="M87.541-866.943l3.118-1.892,3.118,1.892-.826-3.544,2.771-2.4-3.651-.293-1.412-3.358-1.412,3.358-3.651.293,2.771,2.4ZM80-858.682v-19.186a2.053,2.053,0,0,1,.626-1.506A2.053,2.053,0,0,1,82.132-880H99.186a2.053,2.053,0,0,1,1.506.626,2.053,2.053,0,0,1,.626,1.506v12.791a2.053,2.053,0,0,1-.626,1.506,2.053,2.053,0,0,1-1.506.626H84.264Zm3.358-6.4H99.186v-12.791H82.132v13.99Zm-1.226,0v0Z" transform="translate(-78.999 881)" fill="#595c5c" stroke="#fff" strokeWidth="0.2" />
      </svg>
    ),
    CalendarIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22.222" viewBox="0 0 20 22.222">
        <path id="calendar_icon" d="M156.671,48.89h1.111A2.222,2.222,0,0,1,160,51.112V66.668a2.222,2.222,0,0,1-2.222,2.222H142.226A2.222,2.222,0,0,1,140,66.668V51.112a2.222,2.222,0,0,1,2.222-2.222h1.111V47.779a1.111,1.111,0,0,1,2.222,0V48.89h8.889V47.779a1.111,1.111,0,0,1,2.222,0Zm1.111,3.889v1.667H142.226V66.668h15.555Zm-13.333,3.889h4.445v4.444h-4.445Z" transform="translate(-140.004 -46.668)" fill="#969498" />
      </svg>
    ),
    EditCalendarIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="9.672" height="16.725" viewBox="0 0 9.672 16.725">
        <path id="Path_9944" data-name="Path 9944" d="M8.972,8.01,8.389,7.4,1.286,0,0,1.221,6.521,8.01,0,14.8,1.286,16.02l7.1-7.4Z" transform="translate(0.354 0.352)" fill="#969498" stroke="#969498" strokeWidth="0.5" />
      </svg>
    ),
    PageNotFoundIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" id="_404" data-name="404" width="304.457" height="246.589" viewBox="0 0 304.457 246.589">
        <g id="Group_103" data-name="Group 103">
          <path id="Path_3089" data-name="Path 3089" d="M2912.851,1605.143a.485.485,0,0,0-.665-.171l-1.611.952-.952-1.611a.486.486,0,0,0-.836.494l.952,1.611-1.611.952a.486.486,0,1,0,.494.836l1.611-.952.952,1.611a.485.485,0,1,0,.836-.494l-.952-1.611,1.612-.952A.487.487,0,0,0,2912.851,1605.143Z" transform="translate(-2673.14 -1413.194)" fill="#afb0b0" />
          <path id="Path_3090" data-name="Path 3090" d="M2944.272,1645.409a2.115,2.115,0,1,1,2.115-2.115A2.118,2.118,0,0,1,2944.272,1645.409Zm0-3.1a.985.985,0,1,0,.985.984A.986.986,0,0,0,2944.272,1642.309Z" transform="translate(-2700.476 -1442.792)" fill="#afb0b0" />
          <path id="Path_3091" data-name="Path 3091" d="M1888.038,1798.888a2.115,2.115,0,1,1,2.115-2.115A2.117,2.117,0,0,1,1888.038,1798.888Zm0-3.1a.985.985,0,1,0,.985.985A.986.986,0,0,0,1888.038,1795.788Z" transform="translate(-1857.927 -1565.221)" fill="#afb0b0" />
          <path id="Path_3092" data-name="Path 3092" d="M3046.081,674.352a2.115,2.115,0,1,1,2.115-2.115A2.117,2.117,0,0,1,3046.081,674.352Zm0-3.1a.985.985,0,1,0,.985.985A.986.986,0,0,0,3046.081,671.252Z" transform="translate(-2781.689 -668.188)" fill="#afb0b0" />
          <path id="Path_3093" data-name="Path 3093" d="M3228.071,955.687a.486.486,0,0,0-.224.649l.82,1.683-1.683.82a.486.486,0,0,0,.425.873l1.683-.82.819,1.683a.486.486,0,1,0,.873-.425l-.82-1.683,1.683-.82a.486.486,0,0,0,.27-.493.478.478,0,0,0-.046-.157.486.486,0,0,0-.649-.224l-1.683.82-.82-1.683A.485.485,0,0,0,3228.071,955.687Z" transform="translate(-2927.462 -895.941)" fill="#afb0b0" />
          <path id="Path_3094" data-name="Path 3094" d="M3074,1138.217a2.115,2.115,0,1,1,2.115-2.115A2.118,2.118,0,0,1,3074,1138.217Zm0-3.1a.985.985,0,1,0,.985.985A.986.986,0,0,0,3074,1135.117Z" transform="translate(-2803.961 -1038.209)" fill="#afb0b0" />
          <path id="Path_3095" data-name="Path 3095" d="M1747.8,1300.171a.486.486,0,0,0-.022.687l1.281,1.365-1.365,1.28a.486.486,0,0,0,.664.708l1.365-1.281L1751,1304.3a.486.486,0,1,0,.708-.665l-1.28-1.365,1.365-1.281a.486.486,0,1,0-.664-.708l-1.365,1.28-1.281-1.365A.487.487,0,0,0,1747.8,1300.171Z" transform="translate(-1747.538 -1170.668)" fill="#afb0b0" />
          <path id="Path_3096" data-name="Path 3096" d="M1843.527,1398.986a2.115,2.115,0,1,1,2.115-2.115A2.118,2.118,0,0,1,1843.527,1398.986Zm0-3.1a.985.985,0,1,0,.985.985A.986.986,0,0,0,1843.527,1395.887Z" transform="translate(-1822.42 -1246.223)" fill="#afb0b0" />
          <g id="Group_102" data-name="Group 102" transform="translate(3.018)">
            <g id="Group_100" data-name="Group 100" transform="translate(0 115.951)">
              <path id="Path_3097" data-name="Path 3097" d="M1816.967,1337.017a.431.431,0,0,1-.024-.86c1.419-.08,2.857-.222,4.271-.422a.431.431,0,0,1,.12.853c-1.438.2-2.9.347-4.343.428Zm-6.056-.019h-.027c-1.447-.09-2.906-.244-4.339-.458a.431.431,0,0,1,.127-.852c1.409.21,2.844.361,4.267.45a.43.43,0,0,1-.026.86Zm16.3-1.6a.431.431,0,0,1-.109-.847c1.38-.362,2.76-.787,4.1-1.262a.431.431,0,1,1,.288.812c-1.363.484-2.766.916-4.17,1.284A.438.438,0,0,1,1827.212,1335.4Zm-26.533-.1a.431.431,0,0,1-.114-.015c-1.4-.382-2.8-.828-4.157-1.327a.431.431,0,0,1,.3-.809c1.339.49,2.714.93,4.088,1.3a.431.431,0,0,1-.113.846Zm36.246-3.533a.43.43,0,0,1-.191-.816c1.277-.632,2.542-1.327,3.76-2.065a.431.431,0,1,1,.446.736c-1.239.751-2.525,1.458-3.824,2.1A.427.427,0,0,1,1836.925,1331.766Zm-45.924-.2a.43.43,0,0,1-.194-.047c-1.292-.655-2.572-1.373-3.806-2.135a.43.43,0,1,1,.452-.733c1.213.749,2.472,1.456,3.743,2.1a.431.431,0,0,1-.195.815Zm54.7-5.322a.43.43,0,0,1-.266-.77c1.122-.877,2.221-1.814,3.265-2.784a.431.431,0,1,1,.586.631c-1.062.986-2.179,1.938-3.321,2.831A.429.429,0,0,1,1845.7,1326.244Zm-63.427-.274a.43.43,0,0,1-.267-.093c-1.135-.9-2.246-1.861-3.3-2.854a.43.43,0,1,1,.59-.627c1.037.976,2.13,1.92,3.246,2.806a.431.431,0,0,1-.268.768Zm70.906-6.906a.43.43,0,0,1-.328-.709c.923-1.086,1.812-2.224,2.64-3.383a.431.431,0,0,1,.7.5c-.843,1.179-1.746,2.336-2.685,3.44A.43.43,0,0,1,1853.177,1319.064Zm-78.337-.324a.43.43,0,0,1-.33-.154c-.932-1.111-1.827-2.275-2.66-3.459a.43.43,0,1,1,.7-.5c.819,1.164,1.7,2.309,2.615,3.4a.431.431,0,0,1-.329.707Zm84.227-8.212a.43.43,0,0,1-.377-.638c.688-1.249,1.33-2.542,1.91-3.843a.431.431,0,1,1,.786.351c-.589,1.323-1.243,2.638-1.942,3.908A.43.43,0,0,1,1859.067,1310.527Zm-90.049-.37a.431.431,0,0,1-.379-.227c-.687-1.276-1.327-2.6-1.9-3.926a.43.43,0,0,1,.79-.343c.567,1.307,1.2,2.606,1.872,3.86a.431.431,0,0,1-.379.635Zm94.109-9.175a.43.43,0,0,1-.411-.558c.422-1.362.792-2.757,1.1-4.148a.431.431,0,0,1,.841.184c-.311,1.415-.686,2.834-1.115,4.219A.431.431,0,0,1,1863.127,1300.983Zm-98.072-.407a.43.43,0,0,1-.412-.307c-.414-1.384-.775-2.807-1.073-4.228a.43.43,0,1,1,.843-.177c.294,1.4.649,2.8,1.056,4.158a.431.431,0,0,1-.289.536A.444.444,0,0,1,1765.055,1300.575Zm100.123-9.762-.042,0a.43.43,0,0,1-.387-.47c.138-1.417.216-2.859.233-4.284a.431.431,0,1,1,.861.01c-.017,1.45-.1,2.915-.237,4.357A.43.43,0,0,1,1865.178,1290.813Zm-102.086-.422a.43.43,0,0,1-.428-.392c-.131-1.445-.2-2.912-.21-4.359a.431.431,0,0,1,.428-.433h0a.431.431,0,0,1,.431.428c.008,1.423.078,2.865.206,4.287a.431.431,0,0,1-.39.468Zm102.033-9.948a.43.43,0,0,1-.427-.385c-.151-1.413-.365-2.841-.634-4.245l-.011-.055a.431.431,0,0,1,.845-.164l.011.056c.274,1.427.491,2.88.645,4.317a.43.43,0,0,1-.382.474A.4.4,0,0,1,1865.125,1280.442Zm-101.914-.426a.4.4,0,0,1-.049,0,.43.43,0,0,1-.379-.476c.164-1.44.392-2.89.678-4.311a.431.431,0,0,1,.844.17c-.281,1.4-.505,2.823-.666,4.239A.431.431,0,0,1,1763.211,1280.017Zm99.771-9.779a.431.431,0,0,1-.41-.3c-.432-1.359-.927-2.715-1.472-4.03a.43.43,0,1,1,.8-.329c.553,1.337,1.057,2.716,1.5,4.1a.431.431,0,0,1-.41.561Zm-97.554-.355a.426.426,0,0,1-.134-.022.431.431,0,0,1-.275-.543c.452-1.376.969-2.75,1.535-4.085a.431.431,0,1,1,.792.337c-.557,1.312-1.065,2.664-1.51,4.017A.431.431,0,0,1,1765.428,1269.883Zm93.426-9.157a.43.43,0,0,1-.376-.22c-.7-1.242-1.457-2.469-2.257-3.648a.431.431,0,0,1,.712-.484c.814,1.2,1.587,2.447,2.3,3.71a.431.431,0,0,1-.375.641Zm-89.211-.32a.43.43,0,0,1-.373-.644c.719-1.258,1.5-2.5,2.323-3.694a.431.431,0,1,1,.709.489c-.809,1.174-1.578,2.4-2.285,3.633A.431.431,0,0,1,1769.642,1260.407Zm83.243-8.156a.429.429,0,0,1-.325-.148c-.934-1.075-1.926-2.124-2.948-3.118a.431.431,0,1,1,.6-.617c1.039,1.011,2.048,2.077,3,3.171a.43.43,0,0,1-.325.713Zm-77.215-.283a.431.431,0,0,1-.323-.715c.957-1.089,1.972-2.15,3.016-3.154a.431.431,0,0,1,.6.621c-1.027.987-2.025,2.031-2.966,3.1A.431.431,0,0,1,1775.67,1251.968Zm69.659-6.819a.429.429,0,0,1-.261-.089c-1.131-.867-2.314-1.7-3.513-2.464a.431.431,0,0,1,.464-.725c1.22.781,2.422,1.625,3.573,2.505a.431.431,0,0,1-.262.772Zm-62.064-.238a.431.431,0,0,1-.26-.774c1.156-.874,2.364-1.709,3.589-2.481a.431.431,0,1,1,.459.729c-1.2.759-2.392,1.58-3.529,2.439A.428.428,0,0,1,1783.266,1244.911Zm53.237-5.208a.428.428,0,0,1-.188-.043c-1.282-.623-2.606-1.2-3.936-1.71a.431.431,0,0,1,.31-.8c1.352.521,2.7,1.106,4,1.739a.431.431,0,0,1-.188.818Zm-44.371-.171a.431.431,0,0,1-.185-.819c1.308-.621,2.66-1.194,4.018-1.7a.431.431,0,0,1,.3.807c-1.335.5-2.664,1.063-3.95,1.673A.424.424,0,0,1,1792.131,1239.532Zm34.63-3.393a.425.425,0,0,1-.106-.013c-1.381-.352-2.794-.648-4.2-.881a.43.43,0,1,1,.141-.849c1.429.237,2.866.538,4.271.9a.43.43,0,0,1-.106.848Zm-24.861-.08a.431.431,0,0,1-.1-.849c.856-.21,1.73-.4,2.6-.568.555-.107,1.12-.206,1.678-.294a.431.431,0,1,1,.135.85c-.549.087-1.1.184-1.65.289-.855.164-1.716.352-2.557.559A.431.431,0,0,1,1801.9,1236.059Zm14.6-1.442h-.02c-.754-.034-1.519-.051-2.273-.051-.669,0-1.348.014-2.018.04a.431.431,0,0,1-.034-.86c.681-.027,1.372-.041,2.052-.041.767,0,1.545.018,2.312.052a.431.431,0,0,1-.019.861Z" transform="translate(-1762.454 -1233.705)" fill="#afb0b0" />
            </g>
            <g id="Group_101" data-name="Group 101" transform="translate(113.407)">
              <path id="Path_3098" data-name="Path 3098" d="M2418.888,840.713q-.372.024-.743.045a.431.431,0,0,1-.052-.86h0c1.407-.079,2.832-.194,4.237-.34a.431.431,0,0,1,.089.857C2421.251,840.537,2420.062,840.637,2418.888,840.713Zm-6.714.184h-.033c-1.425-.014-2.867-.063-4.288-.145a.431.431,0,1,1,.05-.86c1.407.081,2.836.13,4.247.144a.43.43,0,0,1,.024.86Zm16.155-1.292a.431.431,0,0,1-.1-.854c1.393-.238,2.8-.511,4.171-.813a.431.431,0,0,1,.185.841c-1.388.3-2.8.581-4.211.821Zm-26.375.6a.426.426,0,0,1-.082,0c-1.414-.177-2.842-.391-4.243-.636a.431.431,0,0,1,.148-.848c1.388.242,2.8.454,4.2.63a.431.431,0,0,1-.025.857Zm36.358-2.894a.431.431,0,0,1-.147-.843c1.354-.393,2.718-.825,4.051-1.282a.43.43,0,1,1,.28.814c-1.346.462-2.723.9-4.09,1.294A.446.446,0,0,1,2438.313,837.314Zm-46.44,1.035a.431.431,0,0,1-.13-.011c-1.384-.339-2.781-.716-4.15-1.122a.43.43,0,1,1,.245-.826c1.356.4,2.739.775,4.11,1.111a.431.431,0,0,1-.075.848Zm56.1-4.451a.43.43,0,0,1-.194-.827c1.3-.546,2.606-1.131,3.877-1.738a.43.43,0,0,1,.371.777c-1.284.613-2.6,1.2-3.916,1.755A.432.432,0,0,1,2447.969,833.9Zm-65.9,1.444a.431.431,0,0,1-.177-.026c-1.336-.495-2.679-1.03-3.991-1.589a.431.431,0,0,1,.338-.792c1.3.554,2.63,1.083,3.953,1.574a.431.431,0,0,1-.122.834Zm75.1-5.942a.431.431,0,0,1-.24-.8c1.226-.69,2.453-1.419,3.646-2.167a.431.431,0,1,1,.458.73c-1.2.755-2.442,1.491-3.681,2.188A.425.425,0,0,1,2457.164,829.4Zm-84.493,1.835a.428.428,0,0,1-.222-.046c-1.271-.645-2.544-1.328-3.782-2.032a.431.431,0,1,1,.426-.749c1.226.7,2.487,1.374,3.746,2.013a.431.431,0,0,1-.168.814Zm93.106-7.353a.43.43,0,0,1-.281-.778c1.141-.826,2.276-1.691,3.377-2.571a.43.43,0,0,1,.538.672c-1.111.888-2.258,1.762-3.409,2.6A.429.429,0,0,1,2465.777,823.883Zm-101.969,2.206a.43.43,0,0,1-.265-.07c-1.189-.785-2.375-1.608-3.525-2.447a.43.43,0,1,1,.508-.7c1.139.831,2.314,1.646,3.492,2.424a.43.43,0,0,1-.209.789Zm109.9-8.674a.431.431,0,0,1-.319-.747c1.039-.951,2.07-1.94,3.064-2.941a.431.431,0,0,1,.611.607c-1,1.01-2.044,2.009-3.094,2.969A.429.429,0,0,1,2473.709,817.414Zm-118.119,2.557a.429.429,0,0,1-.3-.1c-1.092-.913-2.177-1.865-3.224-2.829a.431.431,0,0,1,.583-.634c1.037.955,2.112,1.9,3.193,2.8a.43.43,0,0,1-.248.76Zm125.267-9.889a.431.431,0,0,1-.353-.712c.926-1.064,1.838-2.165,2.712-3.271a.43.43,0,1,1,.676.534c-.883,1.117-1.8,2.228-2.738,3.3A.428.428,0,0,1,2480.858,810.082Zm-132.737,2.882a.429.429,0,0,1-.34-.133c-.981-1.031-1.95-2.1-2.881-3.175a.43.43,0,1,1,.651-.563c.922,1.066,1.882,2.124,2.853,3.145a.431.431,0,0,1-.284.727Zm139.011-10.98a.43.43,0,0,1-.382-.673c.8-1.163,1.582-2.36,2.325-3.559a.43.43,0,0,1,.732.454c-.75,1.21-1.54,2.419-2.348,3.593A.43.43,0,0,1,2487.132,801.985ZM2341.5,805.159a.43.43,0,0,1-.372-.17c-.856-1.135-1.7-2.305-2.5-3.48a.431.431,0,0,1,.711-.485c.794,1.163,1.627,2.323,2.475,3.447a.431.431,0,0,1-.315.689Zm150.951-11.934a.431.431,0,0,1-.408-.632c.663-1.248,1.3-2.527,1.907-3.8a.431.431,0,1,1,.779.368c-.608,1.287-1.255,2.579-1.926,3.838A.429.429,0,0,1,2492.45,793.225Zm-156.638,3.428a.431.431,0,0,1-.4-.211c-.72-1.224-1.421-2.483-2.083-3.74a.431.431,0,0,1,.762-.4c.655,1.246,1.349,2.492,2.063,3.7a.43.43,0,0,1-.343.648Zm160.927-12.739a.425.425,0,0,1-.185-.029.43.43,0,0,1-.243-.558c.517-1.316,1.009-2.66,1.461-4a.431.431,0,0,1,.816.276c-.457,1.349-.954,2.707-1.476,4.035A.431.431,0,0,1,2496.739,783.914Zm-165.6,3.636a.43.43,0,0,1-.421-.255c-.577-1.3-1.13-2.635-1.644-3.963a.43.43,0,0,1,.8-.31c.509,1.315,1.056,2.636,1.627,3.925a.43.43,0,0,1-.366.6Zm168.8-13.38a.431.431,0,0,1-.444-.54c.363-1.367.7-2.76.994-4.141a.431.431,0,0,1,.842.181c-.3,1.394-.637,2.8-1,4.181A.431.431,0,0,1,2499.937,774.17Zm-172.4,3.792a.43.43,0,0,1-.438-.3c-.424-1.359-.82-2.746-1.178-4.125a.431.431,0,0,1,.833-.217c.355,1.365.748,2.74,1.167,4.086a.43.43,0,0,1-.283.539A.425.425,0,0,1,2327.532,777.962Zm174.462-13.836a.419.419,0,0,1-.09,0,.43.43,0,0,1-.364-.488c.2-1.395.375-2.814.51-4.219a.43.43,0,1,1,.857.083c-.137,1.418-.311,2.851-.515,4.259A.43.43,0,0,1,2501.994,764.126Zm-176.947,3.9a.43.43,0,0,1-.45-.349c-.266-1.4-.5-2.821-.7-4.233a.43.43,0,1,1,.852-.121c.2,1.4.433,2.809.7,4.193a.43.43,0,0,1-.342.5A.408.408,0,0,1,2325.048,768.025Zm177.836-14.1h-.041a.43.43,0,0,1-.417-.443c.042-1.409.05-2.839.024-4.249a.43.43,0,0,1,.861-.016c.026,1.424.018,2.868-.024,4.29A.431.431,0,0,1,2502.884,753.922ZM2323.7,757.868a.43.43,0,0,1-.457-.4q-.038-.5-.071-1.006c-.07-1.088-.122-2.191-.153-3.279a.43.43,0,1,1,.861-.024c.031,1.078.082,2.17.151,3.248q.032.5.07,1a.43.43,0,0,1-.4.462Zm178.9-14.186a.431.431,0,0,1-.457-.393c-.118-1.4-.272-2.825-.457-4.226l-.018-.136a.43.43,0,1,1,.853-.114l.018.138c.187,1.414.342,2.85.461,4.266a.43.43,0,0,1-.393.465Zm-179.094,3.945h-.045a.43.43,0,0,1-.414-.447c.054-1.423.144-2.864.266-4.282a.431.431,0,0,1,.858.074c-.121,1.4-.21,2.831-.264,4.241A.431.431,0,0,1,2323.508,747.627ZM2501.14,733.4a.43.43,0,0,1-.449-.345c-.278-1.384-.593-2.778-.935-4.145a.431.431,0,1,1,.835-.209c.346,1.38.664,2.788.944,4.185a.43.43,0,0,1-.337.507A.438.438,0,0,1,2501.14,733.4Zm-176.655,4.028a.431.431,0,0,1-.453-.5c.217-1.411.473-2.835.758-4.234a.431.431,0,0,1,.844.172c-.283,1.385-.535,2.8-.751,4.193A.432.432,0,0,1,2324.486,737.431Zm174.07-13.939a.431.431,0,0,1-.437-.3c-.433-1.342-.9-2.692-1.4-4.011a.431.431,0,1,1,.806-.3c.5,1.332.978,2.695,1.415,4.05a.431.431,0,0,1-.277.542A.415.415,0,0,1,2498.556,723.492Zm-171.924,3.9a.431.431,0,0,1-.443-.544c.378-1.375.795-2.759,1.239-4.115a.431.431,0,0,1,.819.268c-.44,1.343-.853,2.715-1.227,4.076A.432.432,0,0,1,2326.632,727.4Zm168.223-13.456a.431.431,0,0,1-.42-.251c-.585-1.284-1.208-2.57-1.853-3.824a.43.43,0,1,1,.765-.394c.651,1.266,1.281,2.565,1.871,3.861a.43.43,0,0,1-.364.608Zm-164.94,3.739a.426.426,0,0,1-.188-.031.43.43,0,0,1-.238-.56c.533-1.321,1.1-2.649,1.7-3.944a.431.431,0,0,1,.783.36c-.59,1.283-1.156,2.6-1.684,3.907A.431.431,0,0,1,2329.915,717.68Zm160.17-12.8a.43.43,0,0,1-.4-.208c-.726-1.205-1.491-2.41-2.275-3.58a.431.431,0,0,1,.716-.479c.791,1.182,1.563,2.4,2.3,3.615a.43.43,0,0,1-.146.591A.424.424,0,0,1,2490.085,704.884Zm-155.8,3.523a.43.43,0,0,1-.406-.635c.679-1.251,1.4-2.5,2.137-3.723a.431.431,0,1,1,.736.446c-.732,1.207-1.444,2.448-2.117,3.688A.43.43,0,0,1,2334.285,708.407Zm150.028-11.97a.43.43,0,0,1-.369-.167c-.861-1.116-1.759-2.226-2.671-3.3a.43.43,0,1,1,.656-.557c.921,1.084,1.828,2.2,2.7,3.331a.431.431,0,0,1-.313.693Zm-144.634,3.256a.43.43,0,0,1-.38-.677c.817-1.166,1.673-2.329,2.544-3.455a.431.431,0,0,1,.681.527c-.863,1.116-1.711,2.267-2.52,3.422A.431.431,0,0,1,2339.679,699.693ZM2477.61,688.7a.43.43,0,0,1-.337-.13c-.982-1.011-2-2.013-3.03-2.976a.431.431,0,1,1,.589-.628c1.039.973,2.068,1.984,3.059,3.005a.43.43,0,0,1-.281.729Zm-131.586,2.951a.431.431,0,0,1-.35-.715c.944-1.066,1.926-2.123,2.918-3.143a.431.431,0,0,1,.617.6c-.983,1.01-1.956,2.057-2.891,3.113A.427.427,0,0,1,2346.024,691.65Zm124.046-9.881a.428.428,0,0,1-.3-.1c-1.091-.894-2.218-1.773-3.35-2.615a.431.431,0,0,1,.514-.691c1.143.85,2.281,1.738,3.382,2.64a.431.431,0,0,1-.246.763Zm-116.833,2.612a.431.431,0,0,1-.316-.75c1.058-.951,2.153-1.89,3.255-2.79a.43.43,0,0,1,.544.667c-1.091.891-2.176,1.821-3.223,2.763A.429.429,0,0,1,2353.237,684.381Zm108.552-8.646a.43.43,0,0,1-.261-.068c-1.186-.765-2.406-1.512-3.626-2.22a.43.43,0,1,1,.432-.745c1.232.715,2.464,1.469,3.661,2.241a.431.431,0,0,1-.206.792Zm-100.564,2.246a.431.431,0,0,1-.278-.78c1.159-.824,2.353-1.631,3.549-2.4a.43.43,0,1,1,.465.725c-1.185.76-2.367,1.56-3.515,2.376A.424.424,0,0,1,2361.226,677.982Zm91.65-7.3a.431.431,0,0,1-.219-.044c-1.265-.625-2.563-1.229-3.857-1.794a.431.431,0,0,1,.344-.789c1.307.57,2.617,1.18,3.894,1.811a.431.431,0,0,1-.163.816Zm-82.989,1.861a.43.43,0,0,1-.236-.807c1.247-.687,2.528-1.353,3.807-1.98a.43.43,0,1,1,.379.773c-1.266.62-2.534,1.28-3.77,1.961A.427.427,0,0,1,2369.888,672.54Zm73.553-5.872a.433.433,0,0,1-.173-.025c-1.33-.477-2.689-.929-4.039-1.342a.431.431,0,1,1,.252-.824c1.364.417,2.735.873,4.078,1.355a.431.431,0,0,1-.118.835Zm-64.312,1.453a.431.431,0,0,1-.191-.828c1.317-.539,2.666-1.054,4.008-1.53a.431.431,0,1,1,.288.812c-1.33.471-2.666.981-3.97,1.515A.424.424,0,0,1,2379.129,668.12Zm54.476-4.359a.433.433,0,0,1-.126-.011c-1.377-.322-2.78-.615-4.169-.87a.431.431,0,0,1,.156-.847c1.4.258,2.82.553,4.21.878a.431.431,0,0,1-.07.849Zm-44.791,1.03a.431.431,0,0,1-.144-.844c1.37-.385,2.768-.742,4.157-1.061a.431.431,0,0,1,.193.839c-1.376.317-2.761.67-4.117,1.051A.434.434,0,0,1,2388.814,664.791Zm34.689-2.786a.428.428,0,0,1-.077,0c-1.4-.161-2.824-.29-4.232-.384a.431.431,0,0,1,.057-.859c1.421.095,2.859.225,4.273.388a.431.431,0,0,1-.021.857Zm-24.687.582a.43.43,0,0,1-.1-.855c.876-.142,1.768-.272,2.651-.389.531-.07,1.07-.136,1.6-.2a.43.43,0,1,1,.1.855c-.525.06-1.059.125-1.585.195-.875.115-1.759.245-2.626.385Zm14.46-1.167h-.028c-1.408,0-2.838.035-4.248.1a.43.43,0,0,1-.049-.859h.008c1.424-.068,2.867-.1,4.289-.1a.43.43,0,0,1,.028.86Z" transform="translate(-2323.02 -660.561)" fill="#afb0b0" />
            </g>
          </g>
        </g>
        <g id="Group_106" data-name="Group 106" transform="translate(79.433 12.367)">
          <g id="Group_104" data-name="Group 104">
            <path id="Path_3099" data-name="Path 3099" d="M2281.566,762.855V910.973h-.388l-11.214-10.912-11.215,10.912h-1.168l-11.214-10.912-11.215,10.912H2234l-11.2-10.892-11.194,10.892h-1.146l-11.207-10.9-11.207,10.9h-1.182l-11.207-10.9-11.207,10.9h-1.169L2152.1,900.09l-11.186,10.883h-.739V721.69H2240.4Z" transform="translate(-2140.174 -721.69)" fill="#ededed" />
            <path id="Path_3100" data-name="Path 3100" d="M2676.758,762.856h-41.165V721.69Z" transform="translate(-2535.366 -721.69)" fill="#d4d4d4" />
          </g>
          <g id="Group_105" data-name="Group 105" transform="translate(17.442 77.778)">
            <path id="Path_3101" data-name="Path 3101" d="M2247,1146.587v-5.539h-14.95a6.145,6.145,0,0,1-4.244-1.281,4.464,4.464,0,0,1-1.415-3.484,3.374,3.374,0,0,1,.208-1.146,5.923,5.923,0,0,1,.625-1.221q.416-.64.864-1.236t1.1-1.459l15.784-21.115a24.009,24.009,0,0,1,2.546-3.023,3.375,3.375,0,0,1,2.4-.938q4.527,0,4.527,5.182v23.05h1.281a9.048,9.048,0,0,1,3.678.625q1.385.625,1.385,2.74a2.852,2.852,0,0,1-1.132,2.517,5.957,5.957,0,0,1-3.4.789h-1.816v5.539a4.947,4.947,0,0,1-1.013,3.41,3.793,3.793,0,0,1-5.405-.03A4.914,4.914,0,0,1,2247,1146.587Zm-12.806-12.21H2247v-17.3Z" transform="translate(-2226.387 -1106.145)" fill="#333537" />
            <path id="Path_3102" data-name="Path 3102" d="M2446.483,1129.9a51.062,51.062,0,0,1-.6,8.4,19.556,19.556,0,0,1-2.2,6.373,14.637,14.637,0,0,1-5.241,5.42,14.236,14.236,0,0,1-15.263-.655,15.583,15.583,0,0,1-5.405-7.088,26.353,26.353,0,0,1-1.355-5.465,45.43,45.43,0,0,1-.432-6.477,62.153,62.153,0,0,1,.477-8.1,26.725,26.725,0,0,1,1.489-6.194,13.326,13.326,0,0,1,13.1-8.785,14.919,14.919,0,0,1,5.569,1,12.713,12.713,0,0,1,4.393,2.919,16.7,16.7,0,0,1,3.2,4.75Q2446.482,1120.9,2446.483,1129.9Zm-8.16-.6a49.63,49.63,0,0,0-.655-8.919,10.982,10.982,0,0,0-2.2-5.241,5.4,5.4,0,0,0-4.288-1.772q-3.931,0-5.465,3.961t-1.534,12.21a52.465,52.465,0,0,0,.655,9.172,11.521,11.521,0,0,0,2.2,5.405,5.754,5.754,0,0,0,8.488-.074,11.825,11.825,0,0,0,2.174-5.45A55.5,55.5,0,0,0,2438.323,1129.3Z" transform="translate(-2377.63 -1107.083)" fill="#333537" />
            <path id="Path_3103" data-name="Path 3103" d="M2605.292,1146.587v-5.539h-14.95a6.144,6.144,0,0,1-4.244-1.281,4.464,4.464,0,0,1-1.415-3.484,3.374,3.374,0,0,1,.208-1.146,5.923,5.923,0,0,1,.625-1.221q.417-.64.864-1.236t1.1-1.459l15.784-21.115a24.029,24.029,0,0,1,2.546-3.023,3.374,3.374,0,0,1,2.4-.938q4.526,0,4.527,5.182v23.05h1.281a9.045,9.045,0,0,1,3.677.625q1.385.625,1.385,2.74a2.852,2.852,0,0,1-1.131,2.517,5.957,5.957,0,0,1-3.4.789h-1.816v5.539a4.948,4.948,0,0,1-1.012,3.41,3.793,3.793,0,0,1-5.405-.03A4.916,4.916,0,0,1,2605.292,1146.587Zm-12.806-12.21h12.806v-17.3Z" transform="translate(-2512.198 -1106.145)" fill="#333537" />
          </g>
        </g>
        <g id="Group_110" data-name="Group 110" transform="translate(64.167 160.265)">
          <g id="Group_109" data-name="Group 109">
            <path id="Path_3104" data-name="Path 3104" d="M2321.808,1709.844h0a4.988,4.988,0,0,1-7.053,0l-30.28-30.28-3.847-3.848a24.872,24.872,0,0,0,7.052-7.053l34.128,34.128A4.986,4.986,0,0,1,2321.808,1709.844Z" transform="translate(-2236.947 -1624.982)" fill="#9c9c9c" />
            <path id="Path_3105" data-name="Path 3105" d="M2295.265,1676.244l7.89,7.891a24.879,24.879,0,0,1-7.052,7.053h0l-4.043-4.043-3.847-3.848A24.875,24.875,0,0,0,2295.265,1676.244Z" transform="translate(-2242.997 -1631.028)" fill="#5e5e5e" />
            <g id="Group_108" data-name="Group 108">
              <path id="Path_3106" data-name="Path 3106" d="M2124.843,1481.528a30.079,30.079,0,0,0-60.131,1.3,30.559,30.559,0,0,0,.19,3.4,29.839,29.839,0,0,0,2.878,9.848h0a30.181,30.181,0,0,0,9.175,10.973q.943.7,1.944,1.32a30.1,30.1,0,0,0,33.341-1.04h0a30.241,30.241,0,0,0,7.052-7.052h0a29.944,29.944,0,0,0,5.575-17.45Q2124.871,1482.173,2124.843,1481.528Zm-30.052,26.025a24.728,24.728,0,1,1,24.728-24.727q0,.565-.026,1.123a24.6,24.6,0,0,1-4.047,12.479,24.767,24.767,0,0,1-9.184,8.31,24.642,24.642,0,0,1-11.471,2.815Z" transform="translate(-2064.712 -1452.745)" fill="#b8b8b8" />
              <g id="Group_107" data-name="Group 107" transform="translate(9.044 9.045)">
                <path id="Path_3107" data-name="Path 3107" d="M2111.727,1521.209a2.309,2.309,0,0,1-2.309-2.309,21.445,21.445,0,0,1,21.445-21.445,2.309,2.309,0,0,1,0,4.619,16.826,16.826,0,0,0-16.826,16.826A2.309,2.309,0,0,1,2111.727,1521.209Z" transform="translate(-2109.418 -1497.455)" fill="#fff" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    ),
    HomeReturnIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="17.5" height="18.445" viewBox="0 0 17.5 18.445">
        <path id="home_2_" data-name="home (2)" d="M5.606,15.807V13.225a1.2,1.2,0,0,1,1.2-1.2h2.43a1.2,1.2,0,0,1,1.207,1.2h0v2.591a1.032,1.032,0,0,0,1.013,1.027h1.62A2.91,2.91,0,0,0,16,13.947h0V6.6A2.054,2.054,0,0,0,15.19,5L9.649.577a2.678,2.678,0,0,0-3.322,0L.81,5A2.038,2.038,0,0,0,0,6.608v7.339a2.91,2.91,0,0,0,2.925,2.9h1.62A1.04,1.04,0,0,0,5.59,15.807h0" transform="translate(0.75 0.853)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    ),
    WelcomeIcon: (
      <svg id="Welcome" xmlns="http://www.w3.org/2000/svg" width="36.223" height="36.223" viewBox="0 0 36.223 36.223">
        <path id="Path_9956" data-name="Path 9956" d="M0,0H36.223V36.223H0Z" fill="none"/>
        <path id="Path_9957" data-name="Path 9957" d="M20.6,10.037V7.019A3.019,3.019,0,0,0,17.583,4H7.019A3.019,3.019,0,0,0,4,7.019V25.13a3.019,3.019,0,0,0,3.019,3.019H17.583A3.019,3.019,0,0,0,20.6,25.13V22.111" transform="translate(2.037 2.037)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path id="Path_9958" data-name="Path 9958" d="M27.621,13.528H8L12.528,9" transform="translate(4.074 4.583)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        <path id="Path_9959" data-name="Path 9959" d="M12.528,16.528,8,12" transform="translate(4.074 6.111)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
      </svg>
    ),
    Error: (
      <svg xmlns="http://www.w3.org/2000/svg" id="error" width="304.457" height="246.589" viewBox="0 0 304.457 246.589">
      <g id="Group_103" data-name="Group 103">
        <path id="Path_3089" data-name="Path 3089" d="M2912.851,1605.143a.485.485,0,0,0-.665-.171l-1.611.952-.952-1.611a.486.486,0,0,0-.836.494l.952,1.611-1.611.952a.486.486,0,1,0,.494.836l1.611-.952.952,1.611a.485.485,0,1,0,.836-.494l-.952-1.611,1.612-.952A.487.487,0,0,0,2912.851,1605.143Z" transform="translate(-2673.14 -1413.194)" fill="#afb0b0"/>
        <path id="Path_3090" data-name="Path 3090" d="M2944.272,1645.409a2.115,2.115,0,1,1,2.115-2.115A2.118,2.118,0,0,1,2944.272,1645.409Zm0-3.1a.985.985,0,1,0,.985.984A.986.986,0,0,0,2944.272,1642.309Z" transform="translate(-2700.476 -1442.792)" fill="#afb0b0"/>
        <path id="Path_3091" data-name="Path 3091" d="M1888.038,1798.888a2.115,2.115,0,1,1,2.115-2.115A2.117,2.117,0,0,1,1888.038,1798.888Zm0-3.1a.985.985,0,1,0,.985.985A.986.986,0,0,0,1888.038,1795.788Z" transform="translate(-1857.927 -1565.221)" fill="#afb0b0"/>
        <path id="Path_3092" data-name="Path 3092" d="M3046.081,674.352a2.115,2.115,0,1,1,2.115-2.115A2.117,2.117,0,0,1,3046.081,674.352Zm0-3.1a.985.985,0,1,0,.985.985A.986.986,0,0,0,3046.081,671.252Z" transform="translate(-2781.689 -668.188)" fill="#afb0b0"/>
        <path id="Path_3093" data-name="Path 3093" d="M3228.071,955.687a.486.486,0,0,0-.224.649l.82,1.683-1.683.82a.486.486,0,0,0,.425.873l1.683-.82.819,1.683a.486.486,0,1,0,.873-.425l-.82-1.683,1.683-.82a.486.486,0,0,0,.27-.493.478.478,0,0,0-.046-.157.486.486,0,0,0-.649-.224l-1.683.82-.82-1.683A.485.485,0,0,0,3228.071,955.687Z" transform="translate(-2927.462 -895.941)" fill="#afb0b0"/>
        <path id="Path_3094" data-name="Path 3094" d="M3074,1138.217a2.115,2.115,0,1,1,2.115-2.115A2.118,2.118,0,0,1,3074,1138.217Zm0-3.1a.985.985,0,1,0,.985.985A.986.986,0,0,0,3074,1135.117Z" transform="translate(-2803.961 -1038.209)" fill="#afb0b0"/>
        <path id="Path_3095" data-name="Path 3095" d="M1747.8,1300.171a.486.486,0,0,0-.022.687l1.281,1.365-1.365,1.28a.486.486,0,0,0,.664.708l1.365-1.281L1751,1304.3a.486.486,0,1,0,.708-.665l-1.28-1.365,1.365-1.281a.486.486,0,1,0-.664-.708l-1.365,1.28-1.281-1.365A.487.487,0,0,0,1747.8,1300.171Z" transform="translate(-1747.538 -1170.668)" fill="#afb0b0"/>
        <path id="Path_3096" data-name="Path 3096" d="M1843.527,1398.986a2.115,2.115,0,1,1,2.115-2.115A2.118,2.118,0,0,1,1843.527,1398.986Zm0-3.1a.985.985,0,1,0,.985.985A.986.986,0,0,0,1843.527,1395.887Z" transform="translate(-1822.42 -1246.223)" fill="#afb0b0"/>
        <g id="Group_102" data-name="Group 102" transform="translate(3.018)">
          <g id="Group_100" data-name="Group 100" transform="translate(0 115.951)">
            <path id="Path_3097" data-name="Path 3097" d="M1816.967,1337.017a.431.431,0,0,1-.024-.86c1.419-.08,2.857-.222,4.271-.422a.431.431,0,0,1,.12.853c-1.438.2-2.9.347-4.343.428Zm-6.056-.019h-.027c-1.447-.09-2.906-.244-4.339-.458a.431.431,0,0,1,.127-.852c1.409.21,2.844.361,4.267.45a.43.43,0,0,1-.026.86Zm16.3-1.6a.431.431,0,0,1-.109-.847c1.38-.362,2.76-.787,4.1-1.262a.431.431,0,1,1,.288.812c-1.363.484-2.766.916-4.17,1.284A.438.438,0,0,1,1827.212,1335.4Zm-26.533-.1a.431.431,0,0,1-.114-.015c-1.4-.382-2.8-.828-4.157-1.327a.431.431,0,0,1,.3-.809c1.339.49,2.714.93,4.088,1.3a.431.431,0,0,1-.113.846Zm36.246-3.533a.43.43,0,0,1-.191-.816c1.277-.632,2.542-1.327,3.76-2.065a.431.431,0,1,1,.446.736c-1.239.751-2.525,1.458-3.824,2.1A.427.427,0,0,1,1836.925,1331.766Zm-45.924-.2a.43.43,0,0,1-.194-.047c-1.292-.655-2.572-1.373-3.806-2.135a.43.43,0,1,1,.452-.733c1.213.749,2.472,1.456,3.743,2.1a.431.431,0,0,1-.195.815Zm54.7-5.322a.43.43,0,0,1-.266-.77c1.122-.877,2.221-1.814,3.265-2.784a.431.431,0,1,1,.586.631c-1.062.986-2.179,1.938-3.321,2.831A.429.429,0,0,1,1845.7,1326.244Zm-63.427-.274a.43.43,0,0,1-.267-.093c-1.135-.9-2.246-1.861-3.3-2.854a.43.43,0,1,1,.59-.627c1.037.976,2.13,1.92,3.246,2.806a.431.431,0,0,1-.268.768Zm70.906-6.906a.43.43,0,0,1-.328-.709c.923-1.086,1.812-2.224,2.64-3.383a.431.431,0,0,1,.7.5c-.843,1.179-1.746,2.336-2.685,3.44A.43.43,0,0,1,1853.177,1319.064Zm-78.337-.324a.43.43,0,0,1-.33-.154c-.932-1.111-1.827-2.275-2.66-3.459a.43.43,0,1,1,.7-.5c.819,1.164,1.7,2.309,2.615,3.4a.431.431,0,0,1-.329.707Zm84.227-8.212a.43.43,0,0,1-.377-.638c.688-1.249,1.33-2.542,1.91-3.843a.431.431,0,1,1,.786.351c-.589,1.323-1.243,2.638-1.942,3.908A.43.43,0,0,1,1859.067,1310.527Zm-90.049-.37a.431.431,0,0,1-.379-.227c-.687-1.276-1.327-2.6-1.9-3.926a.43.43,0,0,1,.79-.343c.567,1.307,1.2,2.606,1.872,3.86a.431.431,0,0,1-.379.635Zm94.109-9.175a.43.43,0,0,1-.411-.558c.422-1.362.792-2.757,1.1-4.148a.431.431,0,0,1,.841.184c-.311,1.415-.686,2.834-1.115,4.219A.431.431,0,0,1,1863.127,1300.983Zm-98.072-.407a.43.43,0,0,1-.412-.307c-.414-1.384-.775-2.807-1.073-4.228a.43.43,0,1,1,.843-.177c.294,1.4.649,2.8,1.056,4.158a.431.431,0,0,1-.289.536A.444.444,0,0,1,1765.055,1300.575Zm100.123-9.762-.042,0a.43.43,0,0,1-.387-.47c.138-1.417.216-2.859.233-4.284a.431.431,0,1,1,.861.01c-.017,1.45-.1,2.915-.237,4.357A.43.43,0,0,1,1865.178,1290.813Zm-102.086-.422a.43.43,0,0,1-.428-.392c-.131-1.445-.2-2.912-.21-4.359a.431.431,0,0,1,.428-.433h0a.431.431,0,0,1,.431.428c.008,1.423.078,2.865.206,4.287a.431.431,0,0,1-.39.468Zm102.033-9.948a.43.43,0,0,1-.427-.385c-.151-1.413-.365-2.841-.634-4.245l-.011-.055a.431.431,0,0,1,.845-.164l.011.056c.274,1.427.491,2.88.645,4.317a.43.43,0,0,1-.382.474A.4.4,0,0,1,1865.125,1280.442Zm-101.914-.426a.4.4,0,0,1-.049,0,.43.43,0,0,1-.379-.476c.164-1.44.392-2.89.678-4.311a.431.431,0,0,1,.844.17c-.281,1.4-.505,2.823-.666,4.239A.431.431,0,0,1,1763.211,1280.017Zm99.771-9.779a.431.431,0,0,1-.41-.3c-.432-1.359-.927-2.715-1.472-4.03a.43.43,0,1,1,.8-.329c.553,1.337,1.057,2.716,1.5,4.1a.431.431,0,0,1-.41.561Zm-97.554-.355a.426.426,0,0,1-.134-.022.431.431,0,0,1-.275-.543c.452-1.376.969-2.75,1.535-4.085a.431.431,0,1,1,.792.337c-.557,1.312-1.065,2.664-1.51,4.017A.431.431,0,0,1,1765.428,1269.883Zm93.426-9.157a.43.43,0,0,1-.376-.22c-.7-1.242-1.457-2.469-2.257-3.648a.431.431,0,0,1,.712-.484c.814,1.2,1.587,2.447,2.3,3.71a.431.431,0,0,1-.375.641Zm-89.211-.32a.43.43,0,0,1-.373-.644c.719-1.258,1.5-2.5,2.323-3.694a.431.431,0,1,1,.709.489c-.809,1.174-1.578,2.4-2.285,3.633A.431.431,0,0,1,1769.642,1260.407Zm83.243-8.156a.429.429,0,0,1-.325-.148c-.934-1.075-1.926-2.124-2.948-3.118a.431.431,0,1,1,.6-.617c1.039,1.011,2.048,2.077,3,3.171a.43.43,0,0,1-.325.713Zm-77.215-.283a.431.431,0,0,1-.323-.715c.957-1.089,1.972-2.15,3.016-3.154a.431.431,0,0,1,.6.621c-1.027.987-2.025,2.031-2.966,3.1A.431.431,0,0,1,1775.67,1251.968Zm69.659-6.819a.429.429,0,0,1-.261-.089c-1.131-.867-2.314-1.7-3.513-2.464a.431.431,0,0,1,.464-.725c1.22.781,2.422,1.625,3.573,2.505a.431.431,0,0,1-.262.772Zm-62.064-.238a.431.431,0,0,1-.26-.774c1.156-.874,2.364-1.709,3.589-2.481a.431.431,0,1,1,.459.729c-1.2.759-2.392,1.58-3.529,2.439A.428.428,0,0,1,1783.266,1244.911Zm53.237-5.208a.428.428,0,0,1-.188-.043c-1.282-.623-2.606-1.2-3.936-1.71a.431.431,0,0,1,.31-.8c1.352.521,2.7,1.106,4,1.739a.431.431,0,0,1-.188.818Zm-44.371-.171a.431.431,0,0,1-.185-.819c1.308-.621,2.66-1.194,4.018-1.7a.431.431,0,0,1,.3.807c-1.335.5-2.664,1.063-3.95,1.673A.424.424,0,0,1,1792.131,1239.532Zm34.63-3.393a.425.425,0,0,1-.106-.013c-1.381-.352-2.794-.648-4.2-.881a.43.43,0,1,1,.141-.849c1.429.237,2.866.538,4.271.9a.43.43,0,0,1-.106.848Zm-24.861-.08a.431.431,0,0,1-.1-.849c.856-.21,1.73-.4,2.6-.568.555-.107,1.12-.206,1.678-.294a.431.431,0,1,1,.135.85c-.549.087-1.1.184-1.65.289-.855.164-1.716.352-2.557.559A.431.431,0,0,1,1801.9,1236.059Zm14.6-1.442h-.02c-.754-.034-1.519-.051-2.273-.051-.669,0-1.348.014-2.018.04a.431.431,0,0,1-.034-.86c.681-.027,1.372-.041,2.052-.041.767,0,1.545.018,2.312.052a.431.431,0,0,1-.019.861Z" transform="translate(-1762.454 -1233.705)" fill="#afb0b0"/>
          </g>
          <g id="Group_101" data-name="Group 101" transform="translate(113.407)">
            <path id="Path_3098" data-name="Path 3098" d="M2418.888,840.713q-.372.024-.743.045a.431.431,0,0,1-.052-.86h0c1.407-.079,2.832-.194,4.237-.34a.431.431,0,0,1,.089.857C2421.251,840.537,2420.062,840.637,2418.888,840.713Zm-6.714.184h-.033c-1.425-.014-2.867-.063-4.288-.145a.431.431,0,1,1,.05-.86c1.407.081,2.836.13,4.247.144a.43.43,0,0,1,.024.86Zm16.155-1.292a.431.431,0,0,1-.1-.854c1.393-.238,2.8-.511,4.171-.813a.431.431,0,0,1,.185.841c-1.388.3-2.8.581-4.211.821Zm-26.375.6a.426.426,0,0,1-.082,0c-1.414-.177-2.842-.391-4.243-.636a.431.431,0,0,1,.148-.848c1.388.242,2.8.454,4.2.63a.431.431,0,0,1-.025.857Zm36.358-2.894a.431.431,0,0,1-.147-.843c1.354-.393,2.718-.825,4.051-1.282a.43.43,0,1,1,.28.814c-1.346.462-2.723.9-4.09,1.294A.446.446,0,0,1,2438.313,837.314Zm-46.44,1.035a.431.431,0,0,1-.13-.011c-1.384-.339-2.781-.716-4.15-1.122a.43.43,0,1,1,.245-.826c1.356.4,2.739.775,4.11,1.111a.431.431,0,0,1-.075.848Zm56.1-4.451a.43.43,0,0,1-.194-.827c1.3-.546,2.606-1.131,3.877-1.738a.43.43,0,0,1,.371.777c-1.284.613-2.6,1.2-3.916,1.755A.432.432,0,0,1,2447.969,833.9Zm-65.9,1.444a.431.431,0,0,1-.177-.026c-1.336-.495-2.679-1.03-3.991-1.589a.431.431,0,0,1,.338-.792c1.3.554,2.63,1.083,3.953,1.574a.431.431,0,0,1-.122.834Zm75.1-5.942a.431.431,0,0,1-.24-.8c1.226-.69,2.453-1.419,3.646-2.167a.431.431,0,1,1,.458.73c-1.2.755-2.442,1.491-3.681,2.188A.425.425,0,0,1,2457.164,829.4Zm-84.493,1.835a.428.428,0,0,1-.222-.046c-1.271-.645-2.544-1.328-3.782-2.032a.431.431,0,1,1,.426-.749c1.226.7,2.487,1.374,3.746,2.013a.431.431,0,0,1-.168.814Zm93.106-7.353a.43.43,0,0,1-.281-.778c1.141-.826,2.276-1.691,3.377-2.571a.43.43,0,0,1,.538.672c-1.111.888-2.258,1.762-3.409,2.6A.429.429,0,0,1,2465.777,823.883Zm-101.969,2.206a.43.43,0,0,1-.265-.07c-1.189-.785-2.375-1.608-3.525-2.447a.43.43,0,1,1,.508-.7c1.139.831,2.314,1.646,3.492,2.424a.43.43,0,0,1-.209.789Zm109.9-8.674a.431.431,0,0,1-.319-.747c1.039-.951,2.07-1.94,3.064-2.941a.431.431,0,0,1,.611.607c-1,1.01-2.044,2.009-3.094,2.969A.429.429,0,0,1,2473.709,817.414Zm-118.119,2.557a.429.429,0,0,1-.3-.1c-1.092-.913-2.177-1.865-3.224-2.829a.431.431,0,0,1,.583-.634c1.037.955,2.112,1.9,3.193,2.8a.43.43,0,0,1-.248.76Zm125.267-9.889a.431.431,0,0,1-.353-.712c.926-1.064,1.838-2.165,2.712-3.271a.43.43,0,1,1,.676.534c-.883,1.117-1.8,2.228-2.738,3.3A.428.428,0,0,1,2480.858,810.082Zm-132.737,2.882a.429.429,0,0,1-.34-.133c-.981-1.031-1.95-2.1-2.881-3.175a.43.43,0,1,1,.651-.563c.922,1.066,1.882,2.124,2.853,3.145a.431.431,0,0,1-.284.727Zm139.011-10.98a.43.43,0,0,1-.382-.673c.8-1.163,1.582-2.36,2.325-3.559a.43.43,0,0,1,.732.454c-.75,1.21-1.54,2.419-2.348,3.593A.43.43,0,0,1,2487.132,801.985ZM2341.5,805.159a.43.43,0,0,1-.372-.17c-.856-1.135-1.7-2.305-2.5-3.48a.431.431,0,0,1,.711-.485c.794,1.163,1.627,2.323,2.475,3.447a.431.431,0,0,1-.315.689Zm150.951-11.934a.431.431,0,0,1-.408-.632c.663-1.248,1.3-2.527,1.907-3.8a.431.431,0,1,1,.779.368c-.608,1.287-1.255,2.579-1.926,3.838A.429.429,0,0,1,2492.45,793.225Zm-156.638,3.428a.431.431,0,0,1-.4-.211c-.72-1.224-1.421-2.483-2.083-3.74a.431.431,0,0,1,.762-.4c.655,1.246,1.349,2.492,2.063,3.7a.43.43,0,0,1-.343.648Zm160.927-12.739a.425.425,0,0,1-.185-.029.43.43,0,0,1-.243-.558c.517-1.316,1.009-2.66,1.461-4a.431.431,0,0,1,.816.276c-.457,1.349-.954,2.707-1.476,4.035A.431.431,0,0,1,2496.739,783.914Zm-165.6,3.636a.43.43,0,0,1-.421-.255c-.577-1.3-1.13-2.635-1.644-3.963a.43.43,0,0,1,.8-.31c.509,1.315,1.056,2.636,1.627,3.925a.43.43,0,0,1-.366.6Zm168.8-13.38a.431.431,0,0,1-.444-.54c.363-1.367.7-2.76.994-4.141a.431.431,0,0,1,.842.181c-.3,1.394-.637,2.8-1,4.181A.431.431,0,0,1,2499.937,774.17Zm-172.4,3.792a.43.43,0,0,1-.438-.3c-.424-1.359-.82-2.746-1.178-4.125a.431.431,0,0,1,.833-.217c.355,1.365.748,2.74,1.167,4.086a.43.43,0,0,1-.283.539A.425.425,0,0,1,2327.532,777.962Zm174.462-13.836a.419.419,0,0,1-.09,0,.43.43,0,0,1-.364-.488c.2-1.395.375-2.814.51-4.219a.43.43,0,1,1,.857.083c-.137,1.418-.311,2.851-.515,4.259A.43.43,0,0,1,2501.994,764.126Zm-176.947,3.9a.43.43,0,0,1-.45-.349c-.266-1.4-.5-2.821-.7-4.233a.43.43,0,1,1,.852-.121c.2,1.4.433,2.809.7,4.193a.43.43,0,0,1-.342.5A.408.408,0,0,1,2325.048,768.025Zm177.836-14.1h-.041a.43.43,0,0,1-.417-.443c.042-1.409.05-2.839.024-4.249a.43.43,0,0,1,.861-.016c.026,1.424.018,2.868-.024,4.29A.431.431,0,0,1,2502.884,753.922ZM2323.7,757.868a.43.43,0,0,1-.457-.4q-.038-.5-.071-1.006c-.07-1.088-.122-2.191-.153-3.279a.43.43,0,1,1,.861-.024c.031,1.078.082,2.17.151,3.248q.032.5.07,1a.43.43,0,0,1-.4.462Zm178.9-14.186a.431.431,0,0,1-.457-.393c-.118-1.4-.272-2.825-.457-4.226l-.018-.136a.43.43,0,1,1,.853-.114l.018.138c.187,1.414.342,2.85.461,4.266a.43.43,0,0,1-.393.465Zm-179.094,3.945h-.045a.43.43,0,0,1-.414-.447c.054-1.423.144-2.864.266-4.282a.431.431,0,0,1,.858.074c-.121,1.4-.21,2.831-.264,4.241A.431.431,0,0,1,2323.508,747.627ZM2501.14,733.4a.43.43,0,0,1-.449-.345c-.278-1.384-.593-2.778-.935-4.145a.431.431,0,1,1,.835-.209c.346,1.38.664,2.788.944,4.185a.43.43,0,0,1-.337.507A.438.438,0,0,1,2501.14,733.4Zm-176.655,4.028a.431.431,0,0,1-.453-.5c.217-1.411.473-2.835.758-4.234a.431.431,0,0,1,.844.172c-.283,1.385-.535,2.8-.751,4.193A.432.432,0,0,1,2324.486,737.431Zm174.07-13.939a.431.431,0,0,1-.437-.3c-.433-1.342-.9-2.692-1.4-4.011a.431.431,0,1,1,.806-.3c.5,1.332.978,2.695,1.415,4.05a.431.431,0,0,1-.277.542A.415.415,0,0,1,2498.556,723.492Zm-171.924,3.9a.431.431,0,0,1-.443-.544c.378-1.375.795-2.759,1.239-4.115a.431.431,0,0,1,.819.268c-.44,1.343-.853,2.715-1.227,4.076A.432.432,0,0,1,2326.632,727.4Zm168.223-13.456a.431.431,0,0,1-.42-.251c-.585-1.284-1.208-2.57-1.853-3.824a.43.43,0,1,1,.765-.394c.651,1.266,1.281,2.565,1.871,3.861a.43.43,0,0,1-.364.608Zm-164.94,3.739a.426.426,0,0,1-.188-.031.43.43,0,0,1-.238-.56c.533-1.321,1.1-2.649,1.7-3.944a.431.431,0,0,1,.783.36c-.59,1.283-1.156,2.6-1.684,3.907A.431.431,0,0,1,2329.915,717.68Zm160.17-12.8a.43.43,0,0,1-.4-.208c-.726-1.205-1.491-2.41-2.275-3.58a.431.431,0,0,1,.716-.479c.791,1.182,1.563,2.4,2.3,3.615a.43.43,0,0,1-.146.591A.424.424,0,0,1,2490.085,704.884Zm-155.8,3.523a.43.43,0,0,1-.406-.635c.679-1.251,1.4-2.5,2.137-3.723a.431.431,0,1,1,.736.446c-.732,1.207-1.444,2.448-2.117,3.688A.43.43,0,0,1,2334.285,708.407Zm150.028-11.97a.43.43,0,0,1-.369-.167c-.861-1.116-1.759-2.226-2.671-3.3a.43.43,0,1,1,.656-.557c.921,1.084,1.828,2.2,2.7,3.331a.431.431,0,0,1-.313.693Zm-144.634,3.256a.43.43,0,0,1-.38-.677c.817-1.166,1.673-2.329,2.544-3.455a.431.431,0,0,1,.681.527c-.863,1.116-1.711,2.267-2.52,3.422A.431.431,0,0,1,2339.679,699.693ZM2477.61,688.7a.43.43,0,0,1-.337-.13c-.982-1.011-2-2.013-3.03-2.976a.431.431,0,1,1,.589-.628c1.039.973,2.068,1.984,3.059,3.005a.43.43,0,0,1-.281.729Zm-131.586,2.951a.431.431,0,0,1-.35-.715c.944-1.066,1.926-2.123,2.918-3.143a.431.431,0,0,1,.617.6c-.983,1.01-1.956,2.057-2.891,3.113A.427.427,0,0,1,2346.024,691.65Zm124.046-9.881a.428.428,0,0,1-.3-.1c-1.091-.894-2.218-1.773-3.35-2.615a.431.431,0,0,1,.514-.691c1.143.85,2.281,1.738,3.382,2.64a.431.431,0,0,1-.246.763Zm-116.833,2.612a.431.431,0,0,1-.316-.75c1.058-.951,2.153-1.89,3.255-2.79a.43.43,0,0,1,.544.667c-1.091.891-2.176,1.821-3.223,2.763A.429.429,0,0,1,2353.237,684.381Zm108.552-8.646a.43.43,0,0,1-.261-.068c-1.186-.765-2.406-1.512-3.626-2.22a.43.43,0,1,1,.432-.745c1.232.715,2.464,1.469,3.661,2.241a.431.431,0,0,1-.206.792Zm-100.564,2.246a.431.431,0,0,1-.278-.78c1.159-.824,2.353-1.631,3.549-2.4a.43.43,0,1,1,.465.725c-1.185.76-2.367,1.56-3.515,2.376A.424.424,0,0,1,2361.226,677.982Zm91.65-7.3a.431.431,0,0,1-.219-.044c-1.265-.625-2.563-1.229-3.857-1.794a.431.431,0,0,1,.344-.789c1.307.57,2.617,1.18,3.894,1.811a.431.431,0,0,1-.163.816Zm-82.989,1.861a.43.43,0,0,1-.236-.807c1.247-.687,2.528-1.353,3.807-1.98a.43.43,0,1,1,.379.773c-1.266.62-2.534,1.28-3.77,1.961A.427.427,0,0,1,2369.888,672.54Zm73.553-5.872a.433.433,0,0,1-.173-.025c-1.33-.477-2.689-.929-4.039-1.342a.431.431,0,1,1,.252-.824c1.364.417,2.735.873,4.078,1.355a.431.431,0,0,1-.118.835Zm-64.312,1.453a.431.431,0,0,1-.191-.828c1.317-.539,2.666-1.054,4.008-1.53a.431.431,0,1,1,.288.812c-1.33.471-2.666.981-3.97,1.515A.424.424,0,0,1,2379.129,668.12Zm54.476-4.359a.433.433,0,0,1-.126-.011c-1.377-.322-2.78-.615-4.169-.87a.431.431,0,0,1,.156-.847c1.4.258,2.82.553,4.21.878a.431.431,0,0,1-.07.849Zm-44.791,1.03a.431.431,0,0,1-.144-.844c1.37-.385,2.768-.742,4.157-1.061a.431.431,0,0,1,.193.839c-1.376.317-2.761.67-4.117,1.051A.434.434,0,0,1,2388.814,664.791Zm34.689-2.786a.428.428,0,0,1-.077,0c-1.4-.161-2.824-.29-4.232-.384a.431.431,0,0,1,.057-.859c1.421.095,2.859.225,4.273.388a.431.431,0,0,1-.021.857Zm-24.687.582a.43.43,0,0,1-.1-.855c.876-.142,1.768-.272,2.651-.389.531-.07,1.07-.136,1.6-.2a.43.43,0,1,1,.1.855c-.525.06-1.059.125-1.585.195-.875.115-1.759.245-2.626.385Zm14.46-1.167h-.028c-1.408,0-2.838.035-4.248.1a.43.43,0,0,1-.049-.859h.008c1.424-.068,2.867-.1,4.289-.1a.43.43,0,0,1,.028.86Z" transform="translate(-2323.02 -660.561)" fill="#afb0b0"/>
          </g>
        </g>
      </g>
      <g id="Group_106" data-name="Group 106" transform="translate(79.433 12.367)">
        <g id="Group_104" data-name="Group 104">
          <path id="Path_3099" data-name="Path 3099" d="M2281.566,762.855V910.973h-.388l-11.214-10.912-11.215,10.912h-1.168l-11.214-10.912-11.215,10.912H2234l-11.2-10.892-11.194,10.892h-1.146l-11.207-10.9-11.207,10.9h-1.182l-11.207-10.9-11.207,10.9h-1.169L2152.1,900.09l-11.186,10.883h-.739V721.69H2240.4Z" transform="translate(-2140.174 -721.69)" fill="#ededed"/>
          <path id="Path_3100" data-name="Path 3100" d="M2676.758,762.856h-41.165V721.69Z" transform="translate(-2535.366 -721.69)" fill="#d4d4d4"/>
        </g>
        <g id="noun-error-905623" transform="translate(28.627 43.443)">
          <g id="Group_1747" data-name="Group 1747" transform="translate(5.169 9.422)">
            <path id="Path_10160" data-name="Path 10160" d="M71.914,80.114H16.524A11.361,11.361,0,0,1,6.686,63.073L34.38,15.1a11.361,11.361,0,0,1,19.678,0L81.753,63.073a11.361,11.361,0,0,1-9.839,17.041Zm-27.695-67.4a8.092,8.092,0,0,0-6.99,4.036L9.535,64.718a8.072,8.072,0,0,0,6.989,12.108h55.39A8.072,8.072,0,0,0,78.9,64.718L51.209,16.747A8.093,8.093,0,0,0,44.219,12.711Z" transform="translate(-5.169 -9.422)" fill="#333537"/>
          </g>
          <g id="Group_1750" data-name="Group 1750" transform="translate(39.604 27.761)">
            <g id="Group_1748" data-name="Group 1748" transform="translate(0 0)">
              <path id="Path_10161" data-name="Path 10161" d="M52.115,59.3a2.8,2.8,0,0,1-2.8,2.8h0a2.8,2.8,0,0,1-2.8-2.8L44.7,33.879c0-1.545,3.068-3.4,4.615-3.4h0c1.546,0,4.615,1.859,4.615,3.4Z" transform="translate(-44.701 -30.475)" fill="#333537"/>
            </g>
            <g id="Group_1749" data-name="Group 1749" transform="translate(1.816 34.497)">
              <path id="Path_10162" data-name="Path 10162" d="M52.536,73.027a2.8,2.8,0,0,1-2.8,2.8h-.152a2.8,2.8,0,0,1-2.8-2.8v-.151a2.8,2.8,0,0,1,2.8-2.8h.152a2.8,2.8,0,0,1,2.8,2.8Z" transform="translate(-46.786 -70.078)" fill="#333537"/>
            </g>
          </g>
        </g>
      </g>
      <g id="Group_110" data-name="Group 110" transform="translate(64.167 160.265)">
        <g id="Group_109" data-name="Group 109">
          <path id="Path_3104" data-name="Path 3104" d="M2321.808,1709.844h0a4.988,4.988,0,0,1-7.053,0l-30.28-30.28-3.847-3.848a24.872,24.872,0,0,0,7.052-7.053l34.128,34.128A4.986,4.986,0,0,1,2321.808,1709.844Z" transform="translate(-2236.947 -1624.982)" fill="#9c9c9c"/>
          <path id="Path_3105" data-name="Path 3105" d="M2295.265,1676.244l7.89,7.891a24.879,24.879,0,0,1-7.052,7.053h0l-4.043-4.043-3.847-3.848A24.875,24.875,0,0,0,2295.265,1676.244Z" transform="translate(-2242.997 -1631.028)" fill="#5e5e5e"/>
          <g id="Group_108" data-name="Group 108">
            <path id="Path_3106" data-name="Path 3106" d="M2124.843,1481.528a30.079,30.079,0,0,0-60.131,1.3,30.559,30.559,0,0,0,.19,3.4,29.839,29.839,0,0,0,2.878,9.848h0a30.181,30.181,0,0,0,9.175,10.973q.943.7,1.944,1.32a30.1,30.1,0,0,0,33.341-1.04h0a30.241,30.241,0,0,0,7.052-7.052h0a29.944,29.944,0,0,0,5.575-17.45Q2124.871,1482.173,2124.843,1481.528Zm-30.052,26.025a24.728,24.728,0,1,1,24.728-24.727q0,.565-.026,1.123a24.6,24.6,0,0,1-4.047,12.479,24.767,24.767,0,0,1-9.184,8.31,24.642,24.642,0,0,1-11.471,2.815Z" transform="translate(-2064.712 -1452.745)" fill="#b8b8b8"/>
            <g id="Group_107" data-name="Group 107" transform="translate(9.044 9.045)">
              <path id="Path_3107" data-name="Path 3107" d="M2111.727,1521.209a2.309,2.309,0,0,1-2.309-2.309,21.445,21.445,0,0,1,21.445-21.445,2.309,2.309,0,0,1,0,4.619,16.826,16.826,0,0,0-16.826,16.826A2.309,2.309,0,0,1,2111.727,1521.209Z" transform="translate(-2109.418 -1497.455)" fill="#fff"/>
            </g>
          </g>
        </g>
      </g>
    </svg>
    ),
    Close: (
      <svg  width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <line x1="18" y1="6" x2="6" y2="18"></line> <line x1="6" y1="6" x2="18" y2="18"></line> </svg>
    ),

    HeadingIcon: (
      <svg id="headings" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
        <path id="Path_9841" data-name="Path 9841" d="M0,0H18V18H0Z" fill="none"/>
        <path id="Path_9842" data-name="Path 9842" d="M18.5,16V10L17,11.5" transform="translate(-4.25 -2.5)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9843" data-name="Path 9843" d="M4,6v9" transform="translate(-1 -1.5)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9844" data-name="Path 9844" d="M12,6v9" transform="translate(-3 -1.5)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9845" data-name="Path 9845" d="M11,18h1.5" transform="translate(-2.75 -4.5)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9846" data-name="Path 9846" d="M3,18H4.5" transform="translate(-0.75 -4.5)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9847" data-name="Path 9847" d="M4,12h6" transform="translate(-1 -3)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9848" data-name="Path 9848" d="M3,6H4.5" transform="translate(-0.75 -1.5)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9849" data-name="Path 9849" d="M11,6h1.5" transform="translate(-2.75 -1.5)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
      </svg>
    ),
    SubHeadingIcon: (
      <svg id="subheadings" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
        <path id="Path_9850" data-name="Path 9850" d="M0,0H18V18H0Z" fill="none"/>
        <path id="Path_9851" data-name="Path 9851" d="M17,11.5a1.5,1.5,0,0,1,3,0,2.718,2.718,0,0,1-.612,1.393L17,16h3" transform="translate(-4.25 -2.5)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9852" data-name="Path 9852" d="M4,6v9" transform="translate(-1 -1.5)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9853" data-name="Path 9853" d="M12,6v9" transform="translate(-3 -1.5)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9854" data-name="Path 9854" d="M11,18h1.5" transform="translate(-2.75 -4.5)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9855" data-name="Path 9855" d="M3,18H4.5" transform="translate(-0.75 -4.5)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9856" data-name="Path 9856" d="M4,12h6" transform="translate(-1 -3)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9857" data-name="Path 9857" d="M3,6H4.5" transform="translate(-0.75 -1.5)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9858" data-name="Path 9858" d="M11,6h1.5" transform="translate(-2.75 -1.5)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
      </svg>
    ),

    NumberListIcon: (
      <svg id="number_list" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
        <path id="Path_9874" data-name="Path 9874" d="M0,0H18V18H0Z" fill="none"/>
        <path id="Path_9875" data-name="Path 9875" d="M11,6h6.75" transform="translate(-2.75 -1.5)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9876" data-name="Path 9876" d="M11,12h6.75" transform="translate(-2.75 -3)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9877" data-name="Path 9877" d="M12,18h6" transform="translate(-3 -4.5)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9878" data-name="Path 9878" d="M4,15.5a1.5,1.5,0,1,1,3,0c0,.443-.375.75-.75,1.125L4,18.5H7" transform="translate(-1 -3.5)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9879" data-name="Path 9879" d="M5.5,8.5V4L4,5.5" transform="translate(-1 -1)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
      </svg>
    ),

    ListIcon: (
      <svg id="list" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
        <path id="Path_9867" data-name="Path 9867" d="M0,0H18V18H0Z" fill="none"/>
        <path id="Path_9868" data-name="Path 9868" d="M9,6h8.25" transform="translate(-2.25 -1.5)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9869" data-name="Path 9869" d="M9,12h8.25" transform="translate(-2.25 -3)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9870" data-name="Path 9870" d="M9,18h8.25" transform="translate(-2.25 -4.5)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9871" data-name="Path 9871" d="M5,6v.008" transform="translate(-1.25 -1.5)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9872" data-name="Path 9872" d="M5,12v.007" transform="translate(-1.25 -3)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9873" data-name="Path 9873" d="M5,18v.007" transform="translate(-1.25 -4.5)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
      </svg>
    ),
    ImageIcon: (
      <svg id="image" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
        <path id="Path_9859" data-name="Path 9859" d="M0,0H18V18H0Z" fill="none"/>
        <path id="Path_9860" data-name="Path 9860" d="M15,8h.007" transform="translate(-3.75 -2)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9861" data-name="Path 9861" d="M3,5.25A2.25,2.25,0,0,1,5.25,3h9A2.25,2.25,0,0,1,16.5,5.25v9a2.25,2.25,0,0,1-2.25,2.25h-9A2.25,2.25,0,0,1,3,14.25Z" transform="translate(-0.75 -0.75)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9862" data-name="Path 9862" d="M3,14.583l3.75-3.75a1.511,1.511,0,0,1,2.25,0l3.75,3.75" transform="translate(-0.75 -2.583)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9863" data-name="Path 9863" d="M14,13.583l.75-.75a1.511,1.511,0,0,1,2.25,0l2.25,2.25" transform="translate(-3.5 -3.083)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
      </svg>
    ),
    DeviderIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
        <g id="devider" transform="translate(18) rotate(90)">
          <path id="Path_9889" data-name="Path 9889" d="M0,0H18V18H0Z" fill="none"/>
          <path id="Path_9890" data-name="Path 9890" d="M12,3V4.5" transform="translate(-3 -0.75)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
          <path id="Path_9891" data-name="Path 9891" d="M12,19v1.5" transform="translate(-3 -4.75)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
          <path id="Path_9892" data-name="Path 9892" d="M12,8v6" transform="translate(-3 -2)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
          <path id="Path_9893" data-name="Path 9893" d="M8,17v1.5" transform="translate(-2 -4.25)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
          <path id="Path_9896" data-name="Path 9896" d="M8,5v6" transform="translate(-2 -1.25)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
          <path id="Path_9897" data-name="Path 9897" d="M16,6.5V5" transform="translate(-4 -1.25)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
          <path id="Path_9898" data-name="Path 9898" d="M16,17V11" transform="translate(-4 -2.75)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        </g>
      </svg>
    ),
    BlockquoteIcon: (
      <svg id="blockquote" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
        <path id="Path_9864" data-name="Path 9864" d="M0,0H18V18H0Z" fill="none"/>
        <path id="Path_9865" data-name="Path 9865" d="M8.75,9.75h-3A.75.75,0,0,1,5,9V6.75A.75.75,0,0,1,5.75,6H8a.75.75,0,0,1,.75.75v4.5a3.544,3.544,0,0,1-3,3.75" transform="translate(-1.25 -1.5)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9866" data-name="Path 9866" d="M17.75,9.75h-3A.75.75,0,0,1,14,9V6.75A.75.75,0,0,1,14.75,6H17a.75.75,0,0,1,.75.75v4.5a3.544,3.544,0,0,1-3,3.75" transform="translate(-3.5 -1.5)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
      </svg>
    ),
    AttachentIcon: (
      <svg id="attachment" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
        <path id="Path_9880" data-name="Path 9880" d="M0,0H18V18H0Z" fill="none"/>
        <path id="Path_9881" data-name="Path 9881" d="M12.159,5.939,7.284,10.814a1.591,1.591,0,0,0,2.25,2.25l4.875-4.875a3.182,3.182,0,1,0-4.5-4.5L5.034,8.564a4.773,4.773,0,0,0,6.75,6.75l4.875-4.875" transform="translate(-0.909 -0.689)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
      </svg>
    ),
    ButtonLink: (
      <svg id="button" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
        <path id="Path_9882" data-name="Path 9882" d="M0,0H18V18H0Z" fill="none"/>
        <path id="Path_9883" data-name="Path 9883" d="M3,12H5.25" transform="translate(-0.75 -3)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9884" data-name="Path 9884" d="M12,3V5.25" transform="translate(-3 -0.75)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9885" data-name="Path 9885" d="M7.25,7.25,5.6,5.6" transform="translate(-1.4 -1.4)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9886" data-name="Path 9886" d="M16.2,7.25,17.85,5.6" transform="translate(-4.05 -1.4)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9887" data-name="Path 9887" d="M7.25,16.2,5.6,17.85" transform="translate(-1.4 -4.05)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <path id="Path_9888" data-name="Path 9888" d="M12,12l6.75,2.25-3,1.5-1.5,3L12,12" transform="translate(-3 -3)" fill="none" stroke="#969498" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
      </svg>
    ),
    AcceptIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
  <g id="accept" transform="translate(-3.375 -3.375)">
    <path id="Path_10163" data-name="Path 10163" d="M19.7,13.041l-.762-.783a.164.164,0,0,0-.121-.052h0a.157.157,0,0,0-.121.052L13.42,17.576,11.5,15.655a.167.167,0,0,0-.242,0l-.77.77a.172.172,0,0,0,0,.247l2.423,2.423a.766.766,0,0,0,.506.247.8.8,0,0,0,.5-.238h0l5.785-5.815A.185.185,0,0,0,19.7,13.041Z" transform="translate(-2.715 -3.397)" fill="#37a353"/>
    <path id="Path_10164" data-name="Path 10164" d="M12.375,4.587a7.785,7.785,0,1,1-5.508,2.28,7.737,7.737,0,0,1,5.508-2.28m0-1.212a9,9,0,1,0,9,9,9,9,0,0,0-9-9Z" fill="#37a353"/>
  </g>
</svg>
    ),
    RejectIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="19.5" height="19.5" viewBox="0 0 19.5 19.5">
  <g id="reject" transform="translate(-592.403 -8.404)">
    <path id="Path_10049" data-name="Path 10049" className="cls-1" fill="#de3c34" d="M12,21.75A9.75,9.75,0,1,1,21.75,12,9.686,9.686,0,0,1,12,21.75ZM3.75,12A8.25,8.25,0,1,0,12,3.75,8.2,8.2,0,0,0,3.75,12Z" transform="translate(590.153 6.154)"/>
    <path id="Path_10050" data-name="Path 10050" className="cls-1" fill="#de3c34" d="M10,14.75a.75.75,0,0,1-.53-1.28l4-4A.75.75,0,1,1,14.53,10.53l-4,4A.748.748,0,0,1,10,14.75Z" transform="translate(590.154 6.154)"/>
    <path id="Icon_metro-cross" data-name="Icon metro-cross" className="cls-1" fill="#de3c34" d="M9.648,7.666h0L7.481,5.5,9.647,3.332h0a.224.224,0,0,0,0-.316L8.624,1.993a.224.224,0,0,0-.316,0h0L6.142,4.16,3.975,1.993h0a.224.224,0,0,0-.316,0L2.636,3.017a.224.224,0,0,0,0,.316h0L4.8,5.5,2.636,7.666h0a.224.224,0,0,0,0,.316L3.659,9a.224.224,0,0,0,.316,0h0L6.142,6.838,8.308,9h0a.224.224,0,0,0,.316,0L9.647,7.981a.224.224,0,0,0,0-.316Z" transform="translate(596.012 12.655)"/>
    <path id="Icon_metro-cross_-_Outline" data-name="Icon metro-cross - Outline" className="cls-2" fill="#fff" d="M8.466,9.32A.473.473,0,0,1,8.3,9.29a.468.468,0,0,1-.169-.108l-1.99-1.99-1.99,1.99a.474.474,0,0,1-.669,0L2.459,8.158a.474.474,0,0,1-.109-.5.469.469,0,0,1,.108-.169L4.449,5.5l-1.99-1.99a.469.469,0,0,1-.109-.17.474.474,0,0,1,.109-.5L3.483,1.816a.474.474,0,0,1,.669,0l1.99,1.99,1.99-1.99a.474.474,0,0,1,.669,0L9.824,2.84a.474.474,0,0,1,.109.5.467.467,0,0,1-.108.169L7.834,5.5l1.99,1.99a.469.469,0,0,1,.109.17.474.474,0,0,1-.109.5L8.8,9.182A.47.47,0,0,1,8.466,9.32Zm-5.635-1.5.986.986L6.142,6.485,8.466,8.809l.986-.986L7.127,5.5,9.452,3.175l-.986-.986L6.142,4.513,3.817,2.189l-.986.986L5.156,5.5Z" transform="translate(596.012 12.655)"/>
  </g>
</svg>
    ),
    Link: (
      <svg xmlns="http://www.w3.org/2000/svg" width="19.858" height="16.642" viewBox="0 0 19.858 16.642">
  <path id="link_FILL0_wght300_GRAD0_opsz24" d="M107.871-652.938H104.3a4.144,4.144,0,0,1-3.042-1.257A4.143,4.143,0,0,1,100-657.237a4.145,4.145,0,0,1,1.258-3.042,4.143,4.143,0,0,1,3.042-1.258h3.571v1.421H104.3a2.774,2.774,0,0,0-2.036.843,2.774,2.774,0,0,0-.843,2.036,2.774,2.774,0,0,0,.843,2.036,2.774,2.774,0,0,0,2.036.843h3.571Zm-2.423-3.589v-1.421h7.105v1.421Zm4.682,3.589v-1.421H113.7a2.774,2.774,0,0,0,2.036-.843,2.774,2.774,0,0,0,.843-2.036,2.774,2.774,0,0,0-.843-2.036,2.774,2.774,0,0,0-2.036-.843h-3.571v-1.421H113.7a4.144,4.144,0,0,1,3.042,1.257A4.143,4.143,0,0,1,118-657.238a4.145,4.145,0,0,1-1.258,3.042,4.143,4.143,0,0,1-3.042,1.258Z" transform="translate(-422.005 515.544) rotate(31)" fill="#969498"/>
</svg>
    ),
    LinkSvgGrayIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="19.858" height="16.642" viewBox="0 0 19.858 16.642">
        <path id="link_FILL0_wght300_GRAD0_opsz24" d="M107.871-652.938H104.3a4.144,4.144,0,0,1-3.042-1.257A4.143,4.143,0,0,1,100-657.237a4.145,4.145,0,0,1,1.258-3.042,4.143,4.143,0,0,1,3.042-1.258h3.571v1.421H104.3a2.774,2.774,0,0,0-2.036.843,2.774,2.774,0,0,0-.843,2.036,2.774,2.774,0,0,0,.843,2.036,2.774,2.774,0,0,0,2.036.843h3.571Zm-2.423-3.589v-1.421h7.105v1.421Zm4.682,3.589v-1.421H113.7a2.774,2.774,0,0,0,2.036-.843,2.774,2.774,0,0,0,.843-2.036,2.774,2.774,0,0,0-.843-2.036,2.774,2.774,0,0,0-2.036-.843h-3.571v-1.421H113.7a4.144,4.144,0,0,1,3.042,1.257A4.143,4.143,0,0,1,118-657.238a4.145,4.145,0,0,1-1.258,3.042,4.143,4.143,0,0,1-3.042,1.258Z" transform="translate(-422.005 515.544) rotate(31)" fill="#969498"/>
      </svg>
    ),
    SendSvg: (
      <svg id="send_new_post" xmlns="http://www.w3.org/2000/svg" width="18.257" height="18.257" viewBox="0 0 18.257 18.257">
        <path id="Path_10059" data-name="Path 10059" d="M0,0H18.257V18.257H0Z" fill="none"/>
        <path id="Path_10060" data-name="Path 10060" d="M10,11.368,18.368,3" transform="translate(-2.393 -0.718)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3"/>
        <path id="Path_10061" data-name="Path 10061" d="M16.616,3,11.671,16.692a.418.418,0,0,1-.761,0L8.248,11.368,2.923,8.705a.418.418,0,0,1,0-.761L16.616,3" transform="translate(-0.641 -0.718)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3"/>
      </svg>
    ),
    Cross: (
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" stroke="none">
  <path id="cross" d="M15.523,8.323l-.8-.8-3.2,3.2-3.2-3.2-.8.8,3.2,3.2-3.2,3.2.8.8,3.2-3.2,3.2,3.2.8-.8-3.2-3.2Z" transform="translate(-7.523 -7.523)" fill="#595c5c"/>
</svg>
    ),
    Bell: (
      <svg xmlns="http://www.w3.org/2000/svg" id="create_reminder" width="20.835" height="20.835" viewBox="0 0 20.835 20.835">
  <path id="Path_9786" data-name="Path 9786" d="M0,0H20.835V20.835H0Z" fill="none"/>
  <path id="Path_9787" data-name="Path 9787" d="M9.209,4.736a1.736,1.736,0,1,1,3.472,0,6.077,6.077,0,0,1,3.472,5.209v2.6a3.472,3.472,0,0,0,1.736,2.6H4a3.472,3.472,0,0,0,1.736-2.6v-2.6A6.077,6.077,0,0,1,9.209,4.736" transform="translate(-0.528 -0.396)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
  <path id="Path_9788" data-name="Path 9788" d="M9,17v.868a2.6,2.6,0,0,0,5.209,0V17" transform="translate(-1.187 -2.242)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
</svg>
    ),
  };
};

export default Svg;

