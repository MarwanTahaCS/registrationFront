import React from "react";

export default function Header(props) {
  // const { t, i18n } = useTranslation();

  // function handleClick(language){
  //   i18n.changeLanguage(language);
  // }

  return (
    <header>
      <div className="container pt-2 mb-0" dir="ltr">
        <div className="card m-3">
          <div className="btn-group m-4" role="group" aria-label="Basic example">
          <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => {
                    props.switchLanguage("en");
                  }}
                >
                  English
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => {
                    props.switchLanguage("he");
                  }}
                >
                  עברית
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => {
                    props.switchLanguage("ar");
                  }}
                >
                  العربية
                </button>
          </div>
          <div className="container text-center">
            <div className="row row-cols-auto">
              <div className="col">
                
              </div>
              <div className="col">
                
              </div>
              <div className="col">
                
              </div>
            </div>
          </div>



        </div>
      </div>
    </header>
  );
}
