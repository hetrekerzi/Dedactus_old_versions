'use strict'
module .exports = function() {
    String.prototype.better = function() {
        return this.replace(/(?:\r\n|\r|\n)/g, '');
    }
    
    var result = {};
    var name = null;
    var site = null;
    var details = null;
    var links = null;
    var founders = null;

    var _name = document.getElementsByClassName('u-fontWeight500 s-vgBottom0_5')[0];
    var _site = document.getElementsByClassName('u-uncoloredLink company_url')[0];
    var _details = document.getElementsByClassName('js-startup_high_concept u-fontSize15 u-fontWeight400 u-colorGray3')[0];
    var _links = document.getElementsByClassName('link');
    var _founders = document.getElementsByClassName('section with_filler with_editable_regions dsss17 startups-show-sections ffs70 founders _a _jm')[0];

    if (_name) {
        name = _name.innerHTML;
        if (name) {
            name = name.better();
        }
    }

    if (_site) {
        site = _site.innerHTML;
        if (site) {
            site = site.better();
        }
    }

    if (_details) {
        _details = _details.getElementsByTagName('p')[0];
        if (_details) {
            _details = _details.innerHTML;
            if (_details) {
                details = _details.better();
            }
        }
    }

    if (_links && _links.length > 0) {
        links = [];
        for (var i = 0; i < _links.length; i++) {
            (function(i) {
                var tmpLink = _links[i].getElementsByTagName('a')[0];
                if (tmpLink) {
                    var link = tmpLink.href;
                    if (link) {
                        link = link.better();
                        links.push(link);
                    }
                }
            })(i);
        }
    }

    if (_founders) {
        _founders = _founders.getElementsByClassName('role');
        if (_founders && _founders.length > 0) {
            founders = [];
            for (var i = 0; i < _founders.length; i++) {
                (function(i) {
                    var tmpFounder = _founders[i];
                    if (tmpFounder) {
                        var tmpFounderName = tmpFounder.getElementsByClassName('name')[0];
                        var tmpFounderRole = tmpFounder.getElementsByClassName('role_title')[0];
                        var tmpFounderBio = tmpFounder.getElementsByClassName('bio')[0];
                        var founder = {};

                        if (tmpFounderName) {
                            var name = tmpFounderName.getElementsByTagName('a')[0];
                            if (name) {
                                name = name.innerHTML;
                                if (name) {
                                    name = name.better();
                                    founder.name = name;
                                }
                            }
                        }

                        if (tmpFounderRole) {
                            var position = tmpFounderRole.innerHTML
                            if (position) {
                                position = position.better();
                                founder.position = position;
                            }
                        }

                        if (tmpFounderBio) {
                            var bio = tmpFounderBio.getElementsByTagName('p')[0];
                            if (bio) {

                                var tempElements = bio.getElementsByTagName('a');
                                if (tempElements) {
                                    if (tempElements.length > 0) {
                                        for (var j = 0; j < tempElements.length; i++) {
                                            (function(j) {
                                                bio.removeChild(tempElements[j])
                                            })(j);
                                        }
                                    }
                                }

                                bio = bio.innerHTML;
                                if (bio) {
                                    bio = bio.better().trim().split(' ');
                                    if (bio && bio.length > 0) {
                                        var index = 0;
                                            founder.bio = bio[index];
                                    }
                                }
                            }
                        }
                        founders.push(founder);
                    }
                })(i);
            }
        }
    }
    result.name = name;
    result.site = site;
    result.details = details;
    result.links = links;
    result.founders = founders;
    return result;
};