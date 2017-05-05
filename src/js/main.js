import reqwest from 'reqwest'
import mainHTML from './text/main.html!text'
import share from './lib/share'


var shareFn = share('Interactive title', 'http://gu.com/p/URL', '#Interactive');
var el;
var data;
var comingSoonIndex = 0;

export function init(dom, context, config, mediator) {


  var data;
  var url = "https://interactive.guim.co.uk/docsdata-test/1jct3UKEcoJjKk1TQcYYt-3pidDHaMJiF3LIgPCvspSE.json";
  reqwest({
      url: url,
      type: 'json',
      crossOrigin: true,
      success: function(resp) {
          data = resp;

          for(var i = 0; i < data.sheets.Sheet1.length; i++) {
              if(data.sheets.Sheet1[i].Description === ""){
                comingSoonIndex = i - 1;
                i = data.sheets.Sheet1.length + 1;
              }
          }

          function returnPart(){
            for(var i = 0; i < data.sheets.Sheet1.length; i++) {
              var link = data.sheets.Sheet1[i].Link.split('/');
                if (window.location.href === data.sheets.Sheet1[i].Link) {
                    var part = i + 1;
                    return part;
                }
            }
          }

          var date_raw = data.sheets.Sheet1[comingSoonIndex].Date;
          var manual_dates = {
            '11/10/16': 'Tuesday 11 October',
            '13/10/16': 'Thursday 13 October',
            '18/10/16': 'Tuesday 18 October',
            '20/10/16': 'Thursday 20 October',
            '25/10/16': 'Tuesday 25 October',
            '27/10/16': 'Thursday 27 October',
            '01/11/16': 'Tuesday 1 November',
            '03/11/16': 'Thursday 3 November',
            '08/11/16': 'Tuesday 8 November',
            '10/11/16': 'Thursday 10 November'
          };

          if (date_raw in manual_dates) {
            var date = manual_dates[date_raw];
          } else {
            var date_raw = date_raw.split('/');
            var months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var date = date_raw[0] + ' ' + months[date_raw[1]];
          }


          var comingSoon = "<h5>Coming on " + date + "</h5>" + data.sheets.Sheet1[comingSoonIndex].Description;
          initPageElements(comingSoon, returnPart());
          isPhotoEssay();
      }
  });

  function isPhotoEssay(){
    var photoEssay = false;
    if(document.querySelector('.element-image.element--immersive')){
      document.body.setAttribute('data-photo-essay', 'isPhotoEssay');
      photoEssay = true;
    }
    return photoEssay;
  }

  function isCalloutPage() {
    var callouts = ['muncie-photos-memories-indiana', 'us-election-gary-younge-muncie-indiana', 'middletown-muncie-factories-photo-essay-midwest'];
    var callout = false;

    callouts.forEach(function(c) {
      if (window.location.href.indexOf(c)>0) {
        callout = true;
      }
    });
    // console.log('callout — ', callout);
    return callout;
  }


  // timeout prevents a flash of unstyled elements
  function initPageElements(comingSoonText, returnPart){
    var textBody = document.querySelector('.content__article-body');
    var headlineContainer = document.querySelector('.explore-series-headline .content__main-column');

    var atomItem = document.createElement("div");
    atomItem.classList.add('sidebar-atom');
    atomItem.innerHTML = "<div class='text'><p><strong>The view from Middletown</strong>In this twice-weekly series ahead of the presidential election, Gary Younge spends a month in the mid-western town of Muncie, Indiana –  known as Middletown and traditionally viewed as emblematic of middle America. He’ll ask how this small town is dealing with this big moment, and what we can learn about the electorate’s view of the political class from citizens here, who voted for both Donald Trump and Bernie Sanders in the primaries. Gary is interested in what people might think, not just how they vote – and invites you to contribute to, guide and help shape this series.</p><span class='panel' data-open-sidepanel data-link-name='middletown : learn more about this series'>Learn more about this series</span><a class='link' href='https://membership.theguardian.com/supporter?INTCMP=gdnwb_copts_editorial_mem_gyoungemiddletown_embed' data-link-name='middletown : become a member'>Support our journalism. Become a Member</a></div>";

    var linkItem = document.createElement("a");
    linkItem.classList.add('sidebar-issues');
    linkItem.setAttribute('data-link-name', 'middletown : sidebar callout link');
    linkItem.setAttribute('href', 'https://www.theguardian.com/membership/2016/oct/11/us-election-gary-younge-muncie-indiana');
    linkItem.innerHTML = 'How you can get involved with this project';

    var seriesPageItem = document.createElement("div");
    seriesPageItem.classList.add('series-page-link');
    seriesPageItem.innerHTML = "<div class='part'><strong>Part " + returnPart + "</strong> of a 9 part series</div><div class='why' data-open-sidepanel data-link-name='middletown : why are we covering this'>Why are we covering this?</div><a class='get-involved' href='https://www.theguardian.com/membership/2016/oct/18/muncie-photos-memories-indiana' data-link-name='middletown : get involved with this project'>Share your memories</a>";

    var overlayItem = document.createElement("div");
    overlayItem.classList.add('sidebar-overlay');
    overlayItem.innerHTML = "<div class='sidebar-overlay__overlay' data-close-sidepanel></div><div class='sidebar-overlay__close' data-close-sidepanel><svg width='42' height='42' viewBox='498 -4 42 42' xmlns='http://www.w3.org/2000/svg'><g fill='none' fill-rule='evenodd' transform='translate(498 -4)'><circle fill='#FFF' cx='21' cy='21' r='21'/><path fill='#00456E' d='M21.02 23.04l8.7 7.96L31 29.7 23.06 21 31 12.3 29.7 11l-8.68 7.96-8.73-7.93-1.3 1.3L18.96 21 11 29.68l1.3 1.3'/></g></svg></div><div class='sidebar-overlay__page'><iframe class='series-page' src='https://www.theguardian.com/membership/ng-interactive/2016/oct/11/view-middletown-gary-younge-us-presidential-election?mode=sidebar'></iframe></div>";

    // to-do update with spreadsheet text
    var newsletterItem = document.createElement("div");
    newsletterItem.classList.add('boot_newsletter');
    newsletterItem.innerHTML = comingSoonText + "<form method='post' novalidate action='https://guardiannewsampampmedia.formstack.com/forms/index.php' class='fsForm fsSingleColumn fsMaxCol1' id='fsForm2490271'><input type='hidden' name='form' value='2490271' /><input type='hidden' name='viewkey' value='tOfqZ3Kxj2' /><input type='hidden' name='password' value='' /><input type='hidden' name='hidden_fields' id='hidden_fields2490271' value='' /><input type='hidden' name='fspublicsession' id='session_id2490271' value='' /><input type='hidden' name='incomplete' id='incomplete2490271' value='' /><input type='hidden' name='incomplete_email' id='incomplete_email2490271' value='' /><input type='hidden' name='incomplete_password' id='incomplete_password2490271' /><input type='hidden' name='referrer' id='referrer2490271' value='' /><input type='hidden' name='referrer_type' id='referrer_type2490271' value='link' /><input type='hidden' name='_submit' value='1' /><input type='hidden' name='style_version' value='3' /><input type='hidden' id='fsLatitude' name='latitude' value='' /><input type='hidden' id='fsLongitude' name='longitude' value='' /><input type='hidden' id='viewparam' name='viewparam' value='551498' /><input type='hidden' id='analytics' name='analytics' value='' /><input type='hidden' id='fsSaveResumePassword2490271' value='1' /><label id='label46135110' class='fsLabel fsRequiredLabel' for='field46135110'>Sign up for an email alert when new articles are published</label><input type='email' placeholder='Your email' id='field46135110' name='field46135110' required='required' value='' class='fsField fsFormatEmail fsRequired' aria-required='true' /><div class='marketing'><input type='checkbox' id='field46329861_1' name='field46329861[]' value='I'd also like to receive the latest updates and offers from the Guardian' checked='checked' class='fsField vertical' data-link-name='middletown : newsletter checkbox'><label class='fsOptionLabel vertical' for='field46329861_1'  data-link-name='middletown : newsletter checkbox text'>I'd also like to receive the latest updates and offers from the Guardian</label><p>By proceeding, you agree to the Guardian's <a href='https://www.theguardian.com/help/terms-of-service'>Terms of Service</a> &amp; <a href='https://www.theguardian.com/info/privacy'>Privacy Policy</a>.</p></div><input id='fsSubmitButton2490271' class='fsSubmitButton' type='submit' value='Subscribe' data-link-name='middletown : newsletter sign up in-article' /></form>";

    if (!isCalloutPage() || isPhotoEssay()) {
      headlineContainer.appendChild(seriesPageItem);
      textBody.insertBefore(overlayItem, textBody.childNodes[0]);
    }

    optional_add_quotes_to_standfirst(["'", '"', '’', '‘', '“', '”']);

    var textBodyP = textBody.querySelectorAll('p');
    replaceElement(textBodyP, "{{atom}}", atomItem);
    replaceElement(textBodyP, "{{callout link}}", linkItem);
    replaceElement(textBodyP, "{{newsletter signup}}", newsletterItem);


    [].forEach.call(document.querySelectorAll('.content__series-label__link'), function(link) {
      link.setAttribute('href', 'https://www.theguardian.com/membership/ng-interactive/2016/oct/11/view-middletown-gary-younge-us-presidential-election');
      link.setAttribute('data-link-name', 'middletown : top left logo');
    });


    // Open & close the sidepanel
    var openSidepanelAll = document.querySelectorAll('[data-open-sidepanel]');
    [].forEach.call(openSidepanelAll, function(openSidepanel) {
      openSidepanel.onclick = function() {
        if (is_touch_device()) {
          window.location = 'https://www.theguardian.com/membership/ng-interactive/2016/oct/11/view-middletown-gary-younge-us-presidential-election';
        } else {
          document.querySelector('body').classList.add('series-page-overlay-on');
        }
      }
    });

    var closeSidepanelAll = document.querySelectorAll('[data-close-sidepanel]');
    [].forEach.call(closeSidepanelAll, function(closeSidepanel) {
      closeSidepanel.onclick = function() {
        document.querySelector('body').classList.remove('series-page-overlay-on');
      }
    });


  };


  function is_touch_device() {
    return 'ontouchstart' in window        // works on most browsers
        || navigator.maxTouchPoints;       // works on IE10/11 and Surface
  };

  function replaceElement(list, text, element) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].textContent.toLowerCase()==text) {
        console.log(text);
        list[i].parentNode.replaceChild(element, list[i]);
      }
    }
  }

  function optional_add_quotes_to_standfirst(quotes) {
    var standfirst = document.querySelector('.content__standfirst--explore');
    var standfirst_p = standfirst.querySelector('p');
    var first_char = standfirst_p.innerHTML[0];

    if (quotes.indexOf(first_char) > -1) {
      standfirst.classList.add('quote');
      standfirst_p.innerHTML = standfirst_p.innerHTML.substr(1);
    }

  }

}
