// import reqwest from 'reqwest'
import mainHTML from './text/main.html!text'
import share from './lib/share'


export function init(dom, context, config, mediator) {


    function calcClearanceZone() {
        var clearanceDiv = document.querySelector('.l-side-margins');
        if (clearanceDiv) {
            return clearanceDiv.getBoundingClientRect().top;
        } else {
            return 450;
        }
    }


    var calloutBar = document.createElement("div");
    calloutBar.classList.add('vav-callout');
    calloutBar.innerHTML = '<div class="gs-container"><a href="https://www.theguardian.com/politics/2017/may/06/harrow-west-voters-tell-us-what-issues-will-decide-this-election"><span>Get involved with this project</span> <div class="arrow"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><circle fill="#FFF" cx="12" cy="12" r="12"/><path fill="#717D85" d="M4 12.64h12.46l-4.9 5.74.65.62 6.8-6.68v-.64L12.2 5l-.63.62 4.9 5.74H4"/></g></svg></div></a><div class="logo"><svg width="116" height="43" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path fill="#E32729" d="M53 30l94.92-79 10.92 12.92-94.9 79"/><path fill="#E32729" d="M53 30l10.93 12.9 94.9-78.98-10.9-12.9"/><path fill="#F8AE1D" d="M26.5 30l94.92-79 10.92 12.92-94.9 79"/><path fill="#FAB817" d="M26.5 30l10.93 12.9 94.9-78.98-10.9-12.9"/><path fill="#1A60A9" d="M0 30l10.93 12.9 94.9-78.98-10.9-12.9"/><path fill="#FEFEFE" d="M7.3 32.23l-.66.26-.9-1.1 3.3-2.8.9 1-.42.6 3.44 2.1.05-.1-1.4-3.8-.6.3-.9-1.1 2.7-2.2.9 1.1-.3.5 2.3 6.5-2 1.7M20 24.8c-1.35-1.6-2.1-1.65-2.7-1.2-.56.5-.64 1.2.7 2.76 1.34 1.6 2.1 1.66 2.7 1.16.56-.48.6-1.2-.7-2.7zm-4.2 3.5c-1.8-2.1-1.35-4.44.46-5.94 2.1-1.76 4.2-1.56 5.95.5 1.8 2.1 1.3 4.46-.4 5.95-2 1.8-4.2 1.5-5.9-.5zm8.5-3.7l.55-.7-3-3.54-.9.4-.9-1.1 2.45-2.5.23-.1 4.25 5 .8-.33.9 1.06L25 26l-.9-1.05zm-5.2-7c-.53-.62-.33-1.46.3-2 .67-.54 1.5-.6 2.07.05s.37 1.5-.3 2.03c-.63.6-1.5.6-2.05 0zm7.27 1.97c-1.92-2.3-1.37-4.5.7-6.2.8-.68 1.65-1.2 2.14-1.4l1.6 1.97-1.3 1.17-.9-.7c-.1.1-.2.1-.5.3-.7.6-.7 1.4.5 2.8 1.2 1.5 2.23 1.4 3.3.5.6-.5 1.03-1.1 1.24-1.5l1 1.2c-.15.6-.6 1.5-1.7 2.4-2.2 1.9-4.3 1.5-6-.4zm9.2-9c-.8-1-1.4-1-1.83-.6-.5.4-.6 1 .2 2.1l1.63-1.5zm-3.3 4c-1.72-2.1-1.46-4.3.44-5.9 1.9-1.6 3.6-1.4 5.8 1.2L34.7 13c1.03 1 1.94.9 2.93.06.8-.7 1.2-1.3 1.53-1.8l.95 1.12c-.2.66-.6 1.6-1.8 2.6-2.2 1.8-4.3 1.6-6.1-.5zm9-2.6l-1.55-1.6L41 9.33l.8.5c.23-.1.6-.2 1-.5.5-.47.64-.9.35-1.3-.3-.32-.6-.3-1.3.05l-.8.4c-1.4.7-2.5.7-3.4-.4-1.1-1.2-.9-2.8 1-4.4.72-.66 1.62-1.2 2.3-1.4L42.3 4 41 5.2l-.67-.5c-.2.05-.5.16-.83.45-.46.38-.7.8-.4 1.16.28.3.6.3 1.36-.1l.9-.4c1.5-.7 2.52-.5 3.3.4 1.12 1.3 1 2.9-1.08 4.7-.7.6-1.67 1.2-2.52 1.5zM60.7 32.2l-.64.24-.9-1.05 3.3-2.8.9 1.1-.4.6 3.45 2.1.1-.1-1.5-3.7-.6.3-.9-1.1 2.5-2.1.9 1-.3.5 2.3 6.6-2 1.7-6.1-3.4zm12.48-7.1c-1.36-1.6-2.1-1.7-2.68-1.2-.58.5-.66 1.15.67 2.72 1.34 1.6 2.08 1.67 2.68 1.17.58-.5.6-1.2-.68-2.7zm-4.2 3.5c-1.8-2.15-1.35-4.48.46-5.98 2.06-1.75 4.2-1.55 5.9.5 1.8 2.1 1.36 4.47-.43 5.96-2.1 1.75-4.3 1.47-5.9-.5zm8.7-4.76l-2.84-3.34-.7.58-.8-.97.6-1-.94-1.6 1.7-1.4 1.2 1.5 1.22-1 1.07 1.3-1.3 1 2.5 3c.4.6.8.5 1.3.1.2-.1.4-.3.5-.5l.9 1.1c-.2.4-.6 1-1.3 1.6-1.3 1.1-2.3 1.2-3.4-.1zm5.94-8.76c-.8-.98-1.4-1-1.85-.6-.48.4-.6.97.2 2.07l1.64-1.47zm-3.3 3.97c-1.74-2.02-1.48-4.26.42-5.84 1.92-1.6 3.64-1.4 5.84 1.2l-3.78 3.2c1.04 1 1.95.9 2.95.1.8-.7 1.2-1.2 1.56-1.8l1 1.1c-.2.7-.7 1.6-1.8 2.6-2.2 1.9-4.3 1.6-6.1-.5zm9-2.57L87.66 15l1.3-1.1.83.48c.2-.04.6-.18.9-.5.5-.4.6-.87.3-1.22s-.6-.3-1.3.02l-.8.4c-1.4.7-2.5.7-3.4-.4-1-1.22-.9-2.8 1-4.4.8-.65 1.7-1.2 2.4-1.4l1.4 1.62L89 9.57l-.66-.5c-.2.05-.5.16-.8.44-.48.4-.7.9-.4 1.2.26.4.6.3 1.34-.1l.9-.4c1.5-.7 2.5-.5 3.3.4 1.1 1.3 1 2.9-1.1 4.7-.7.6-1.64 1.2-2.5 1.5zM41.52 32.1l-1.1-1.34-.53.47c-.5.44-.5.85-.1 1.35.4.53.8.6 1.3.24.2-.2.4-.52.4-.73zM38 34.7c-1.03-1.22-.5-2.34.7-3.77l.9-1.12-.24-.3c-.53-.6-.96-.6-1.9.2-.55.5-1.14 1.1-1.5 1.5l-1.06-1.3c.4-.7 1.2-1.7 2.3-2.6 1.57-1.3 2.84-1.2 4 .2l2.34 2.8c.25.3.5.2.74 0l.2-.1.84 1c-.1.3-.5.9-1 1.4-.66.6-1.25.7-1.86.3l-.06.1c.02.7-.28 1.5-1.08 2.2-1.13 1-2.45.9-3.3-.1zm6.83-4.85l.54-.72-3.02-3.57-.86.4-.9-1.08 2.3-2.4.2-.1.5.68V23c.2-.95.5-1.75 1.4-2.47.9-.8 2-.93 2.9.18l3 3.6.7-.3.9 1.1-3.3 2.7-.9-1 .4-.5-2.5-2.8c-.4-.5-.8-.4-1.3 0-.3.3-.5.5-.7.8l2.8 3.4.6-.3.9 1.1-3.2 2.7-.9-1zm11.13-10.1l-2.77-3.27c-.3.02-.5.05-.9.37-.7.54-.8 1.26.5 2.77 1.1 1.37 1.9 1.52 2.5.98.3-.28.5-.58.6-.84zm-5.24 1.97c-2.1-2.48-1.52-4.5.17-5.9.5-.4.8-.56 1.1-.67l-.9-1.02-.9.42-.9-1.08 2.4-2.5.3-.07 6.1 7.2.8-.37.9 1.06-2.1 2.2h-.3l-.5-.6h-.1c0 .7-.4 1.5-1.2 2.1-1.2.9-3 1.3-5-1.1z"/></g></svg></div></div>';

    var bodyTag = document.querySelector('body');

    bodyTag.appendChild(calloutBar);

    function onScrollEventHandler() {
        var VAVCallout = bodyTag.querySelector('.vav-callout');
        var clearanceZone = calcClearanceZone();
        console.log(bodyTag.scrollTop, clearanceZone);
        if (bodyTag.scrollTop > clearanceZone) {
            VAVCallout.classList.add('visible');
        } else {
            VAVCallout.classList.remove('visible');
        }
    }

    var win = window;
    if(win.addEventListener) {
        win.addEventListener('scroll', onScrollEventHandler, false);
    } else if (win.attachEvent) {
        win.attachEvent('onscroll', onScrollEventHandler);
    } else {
        win.onscroll = onScrollEventHandler();
    }


  // var data;
  // var url = "https://interactive.guim.co.uk/docsdata-test/1jct3UKEcoJjKk1TQcYYt-3pidDHaMJiF3LIgPCvspSE.json";
  // reqwest({
  //     url: url,
  //     type: 'json',
  //     crossOrigin: true,
  //     success: function(resp) {
  //         data = resp;
  //
  //         for(var i = 0; i < data.sheets.Sheet1.length; i++) {
  //             if(data.sheets.Sheet1[i].Description === ""){
  //               comingSoonIndex = i - 1;
  //               i = data.sheets.Sheet1.length + 1;
  //             }
  //         }
  //
  //         function returnPart(){
  //           for(var i = 0; i < data.sheets.Sheet1.length; i++) {
  //             var link = data.sheets.Sheet1[i].Link.split('/');
  //               if (window.location.href === data.sheets.Sheet1[i].Link) {
  //                   var part = i + 1;
  //                   return part;
  //               }
  //           }
  //         }
  //
  //         var date_raw = data.sheets.Sheet1[comingSoonIndex].Date;
  //         var manual_dates = {
  //           '11/10/16': 'Tuesday 11 October',
  //           '13/10/16': 'Thursday 13 October',
  //           '18/10/16': 'Tuesday 18 October',
  //           '20/10/16': 'Thursday 20 October',
  //           '25/10/16': 'Tuesday 25 October',
  //           '27/10/16': 'Thursday 27 October',
  //           '01/11/16': 'Tuesday 1 November',
  //           '03/11/16': 'Thursday 3 November',
  //           '08/11/16': 'Tuesday 8 November',
  //           '10/11/16': 'Thursday 10 November'
  //         };
  //
  //         if (date_raw in manual_dates) {
  //           var date = manual_dates[date_raw];
  //         } else {
  //           var date_raw = date_raw.split('/');
  //           var months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  //           var date = date_raw[0] + ' ' + months[date_raw[1]];
  //         }
  //
  //
  //         var comingSoon = "<h5>Coming on " + date + "</h5>" + data.sheets.Sheet1[comingSoonIndex].Description;
  //         initPageElements(comingSoon, returnPart());
  //         isPhotoEssay();
  //     }
  // });

  // function isPhotoEssay(){
  //   var photoEssay = false;
  //   if(document.querySelector('.element-image.element--immersive')){
  //     document.body.setAttribute('data-photo-essay', 'isPhotoEssay');
  //     photoEssay = true;
  //   }
  //   return photoEssay;
  // }

  // timeout prevents a flash of unstyled elements
  // function initPageElements(comingSoonText, returnPart){
  //   var textBody = document.querySelector('.content__article-body');
  //   var headlineContainer = document.querySelector('.explore-series-headline .content__main-column');
  //
  //   var atomItem = document.createElement("div");
  //   atomItem.classList.add('sidebar-atom');
  //   atomItem.innerHTML = "<div class='text'><p><strong>The view from Middletown</strong>In this twice-weekly series ahead of the presidential election, Gary Younge spends a month in the mid-western town of Muncie, Indiana –  known as Middletown and traditionally viewed as emblematic of middle America. He’ll ask how this small town is dealing with this big moment, and what we can learn about the electorate’s view of the political class from citizens here, who voted for both Donald Trump and Bernie Sanders in the primaries. Gary is interested in what people might think, not just how they vote – and invites you to contribute to, guide and help shape this series.</p><span class='panel' data-open-sidepanel data-link-name='middletown : learn more about this series'>Learn more about this series</span><a class='link' href='https://membership.theguardian.com/supporter?INTCMP=gdnwb_copts_editorial_mem_gyoungemiddletown_embed' data-link-name='middletown : become a member'>Support our journalism. Become a Member</a></div>";
  //
  //   var linkItem = document.createElement("a");
  //   linkItem.classList.add('sidebar-issues');
  //   linkItem.setAttribute('data-link-name', 'middletown : sidebar callout link');
  //   linkItem.setAttribute('href', 'https://www.theguardian.com/membership/2016/oct/11/us-election-gary-younge-muncie-indiana');
  //   linkItem.innerHTML = 'How you can get involved with this project';
  //
  //   var seriesPageItem = document.createElement("div");
  //   seriesPageItem.classList.add('series-page-link');
  //   seriesPageItem.innerHTML = "<div class='part'><strong>Part " + returnPart + "</strong> of a 9 part series</div><div class='why' data-open-sidepanel data-link-name='middletown : why are we covering this'>Why are we covering this?</div><a class='get-involved' href='https://www.theguardian.com/membership/2016/oct/18/muncie-photos-memories-indiana' data-link-name='middletown : get involved with this project'>Share your memories</a>";
  //
  //   var overlayItem = document.createElement("div");
  //   overlayItem.classList.add('sidebar-overlay');
  //   overlayItem.innerHTML = "<div class='sidebar-overlay__overlay' data-close-sidepanel></div><div class='sidebar-overlay__close' data-close-sidepanel><svg width='42' height='42' viewBox='498 -4 42 42' xmlns='http://www.w3.org/2000/svg'><g fill='none' fill-rule='evenodd' transform='translate(498 -4)'><circle fill='#FFF' cx='21' cy='21' r='21'/><path fill='#00456E' d='M21.02 23.04l8.7 7.96L31 29.7 23.06 21 31 12.3 29.7 11l-8.68 7.96-8.73-7.93-1.3 1.3L18.96 21 11 29.68l1.3 1.3'/></g></svg></div><div class='sidebar-overlay__page'><iframe class='series-page' src='https://www.theguardian.com/membership/ng-interactive/2016/oct/11/view-middletown-gary-younge-us-presidential-election?mode=sidebar'></iframe></div>";
  //
  //   // to-do update with spreadsheet text
  //   var newsletterItem = document.createElement("div");
  //   newsletterItem.classList.add('boot_newsletter');
  //   newsletterItem.innerHTML = comingSoonText + "<form method='post' novalidate action='https://guardiannewsampampmedia.formstack.com/forms/index.php' class='fsForm fsSingleColumn fsMaxCol1' id='fsForm2490271'><input type='hidden' name='form' value='2490271' /><input type='hidden' name='viewkey' value='tOfqZ3Kxj2' /><input type='hidden' name='password' value='' /><input type='hidden' name='hidden_fields' id='hidden_fields2490271' value='' /><input type='hidden' name='fspublicsession' id='session_id2490271' value='' /><input type='hidden' name='incomplete' id='incomplete2490271' value='' /><input type='hidden' name='incomplete_email' id='incomplete_email2490271' value='' /><input type='hidden' name='incomplete_password' id='incomplete_password2490271' /><input type='hidden' name='referrer' id='referrer2490271' value='' /><input type='hidden' name='referrer_type' id='referrer_type2490271' value='link' /><input type='hidden' name='_submit' value='1' /><input type='hidden' name='style_version' value='3' /><input type='hidden' id='fsLatitude' name='latitude' value='' /><input type='hidden' id='fsLongitude' name='longitude' value='' /><input type='hidden' id='viewparam' name='viewparam' value='551498' /><input type='hidden' id='analytics' name='analytics' value='' /><input type='hidden' id='fsSaveResumePassword2490271' value='1' /><label id='label46135110' class='fsLabel fsRequiredLabel' for='field46135110'>Sign up for an email alert when new articles are published</label><input type='email' placeholder='Your email' id='field46135110' name='field46135110' required='required' value='' class='fsField fsFormatEmail fsRequired' aria-required='true' /><div class='marketing'><input type='checkbox' id='field46329861_1' name='field46329861[]' value='I'd also like to receive the latest updates and offers from the Guardian' checked='checked' class='fsField vertical' data-link-name='middletown : newsletter checkbox'><label class='fsOptionLabel vertical' for='field46329861_1'  data-link-name='middletown : newsletter checkbox text'>I'd also like to receive the latest updates and offers from the Guardian</label><p>By proceeding, you agree to the Guardian's <a href='https://www.theguardian.com/help/terms-of-service'>Terms of Service</a> &amp; <a href='https://www.theguardian.com/info/privacy'>Privacy Policy</a>.</p></div><input id='fsSubmitButton2490271' class='fsSubmitButton' type='submit' value='Subscribe' data-link-name='middletown : newsletter sign up in-article' /></form>";
  //
  //   if (!isCalloutPage() || isPhotoEssay()) {
  //     headlineContainer.appendChild(seriesPageItem);
  //     textBody.insertBefore(overlayItem, textBody.childNodes[0]);
  //   }
  //
  //   optional_add_quotes_to_standfirst(["'", '"', '’', '‘', '“', '”']);
  //
  //   var textBodyP = textBody.querySelectorAll('p');
  //   replaceElement(textBodyP, "{{callout link}}", linkItem);
  //   replaceElement(textBodyP, "{{newsletter signup}}", newsletterItem);
  //
  //
  //   [].forEach.call(document.querySelectorAll('.content__series-label__link'), function(link) {
  //     link.setAttribute('href', 'https://www.theguardian.com/membership/ng-interactive/2016/oct/11/view-middletown-gary-younge-us-presidential-election');
  //     link.setAttribute('data-link-name', 'middletown : top left logo');
  //   });
  //
  //
  //   // Open & close the sidepanel
  //   var openSidepanelAll = document.querySelectorAll('[data-open-sidepanel]');
  //   [].forEach.call(openSidepanelAll, function(openSidepanel) {
  //     openSidepanel.onclick = function() {
  //       if (is_touch_device()) {
  //         window.location = 'https://www.theguardian.com/membership/ng-interactive/2016/oct/11/view-middletown-gary-younge-us-presidential-election';
  //       } else {
  //         document.querySelector('body').classList.add('series-page-overlay-on');
  //       }
  //     }
  //   });
  //
  //   var closeSidepanelAll = document.querySelectorAll('[data-close-sidepanel]');
  //   [].forEach.call(closeSidepanelAll, function(closeSidepanel) {
  //     closeSidepanel.onclick = function() {
  //       document.querySelector('body').classList.remove('series-page-overlay-on');
  //     }
  //   });
  //
  //
  // };
  //
  //

}
