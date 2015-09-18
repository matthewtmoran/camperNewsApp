$(document).ready(function() {
    var url = "http://www.freecodecamp.com/news/hot";

    $.getJSON(
        url, function(response) {
            getDataresponse(response);
        }
    );

    function getDataresponse(obj) {

        for (var i = 0; i < obj.length; i++) {

            //userinfo
            var username = obj[i].author.username,
                userImgURL = obj[i].author.picture,
                userEmail = obj[i].author.email,
                userID = obj[i].author.userId;

            //article info
            var articleID = obj[i].id,
                headline = obj[i].headline,
                articleImg = obj[i].image,
                articleLink = obj[i].link,
                articleVotes = obj[i].upVotes.length,
                articleDate = obj[i].timePosted;

            var contentContainer = $('.content-container');

            //tobe used
            var discussButton = "";
            var postDate = "";
            var profileUrl = "";


            //build function
            function modifyContent() {

                //build article url path
                discussButton = headline.toLocaleLowerCase().replace(/[^a-z0-9\s]+/gi, "");
                discussButton = discussButton.replace(/(\s{2,})+/g," ");
                discussButton = "http://freecodecamp.com/news/" + discussButton.replace(/\s/g, "-");

                //build proper date format
                postDate = new Date(articleDate).toUTCString();
                postDate = postDate.split(' ', 4).join(' ');

                //build user url
                profileUrl = "http://freecodecamp.com/" + username;

                //truncate headline
               headline = headline.trim();
                if (headline.length > 20) {
                    headline = headline.slice(0, 17) + "...";
                }
            }


            //add all content to page
            function render() {
                contentContainer.append('<div class="col-md-1-5 col-sm-3 col-centered news-articles centered">' +
                        '<div class="content-image"><a href="' + articleLink + '" target=_"blank"</a> <img src="' + userImgURL + '"/></div>' +
                        '<div class="content-details ">' +
                            '<a href="' + articleLink + '" target=_"blank" class="headline">' + headline + '</a>' +
                            '<a href="'+ profileUrl +'" class="user-name">By ' + username + '</a>' +
                            '<div class="clearfix"><p class="upvotes pull-left"><i class="fa fa-heart"></i>' + articleVotes + '</p>' +
                            '<a href="' + discussButton + '" target="_blank" class="btn btn-info btn-xs pull-right">discuss</a></div>' +
                            '<p class="post-date">Posted On: ' + postDate + '</p>' +
                        '</div>' +

                    '</div>');
            }


            modifyContent();
            render();


        }
        console.log(obj);
    }
});