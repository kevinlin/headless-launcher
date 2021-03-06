/*global fin*/

'use strict';

/**
 * @ngdoc module
 * @name dockingAdapter
 * @description
 * # dockingAdapter
 * Module for docking.
 */
angular.module('dockingAdapter', [])
  .service('dockingAdapter', function dockingAdapter() {
    return (function() {

            var me = {},
                dockingServerUuid = 'headless-launcher' ;

            me.managedState = {
                dockingTarget: false,
                canDock: false,
                currentlyDocking: false,
                isDocked: false

            };

            me.init = function(mainWindow, fin, document) {
                //console.warn(mainWindow, fin, document);
                me.managedState.mainWindow = mainWindow;

                me.managedState.mainWindow.getBounds(function(bounds) {


                        fin.desktop.InterApplicationBus.publish("dock-subscribe", {
                            name: me.managedState.mainWindow.name,
                            app_uuid: me.managedState.mainWindow.app_uuid,
                            location: bounds
                        });
                    },
                    function(err) {
                        console.log('the err', err);
                    });

                me.managedState.mainWindow.addEventListener('bounds-changing', function(data) {
                    //console.log('on the move ', data);
                    me.managedState.mainWindow.getBounds(function(bounds) {
                            //console.log('where im at', bounds);
                            fin.desktop.InterApplicationBus.publish("dock-window-move", {
                                bounds: bounds,
                                name: me.managedState.mainWindow.name
                            });
                        },
                        function(err) {
                            console.log('the err', err);
                        });
                }); //end bounds changing


                var draggableArea = document.querySelector('.container'),
                    dock = document.querySelector('.dock'),
                    undock = document.querySelector('.undock');


                //set the drag animations.
                me.managedState.mainWindow.defineDraggableArea(draggableArea, function(/*data*/) {
                    me.managedState.mainWindow.animate({
                        opacity: 0.7,
                    }, {
                        interrupt: false
                    });
                }, function(/*data*/) {
                    me.managedState.mainWindow.animate({
                        opacity: 1
                    }, {
                        interrupt: false
                    });
                    mouseUpOnDraggable();
                }, function(err) {
                    console.log(err);
                });

                //WindowFactory.create({name:"asdfasdfa",url:"views/cpu.html",autoShow:true});

                undock.addEventListener('click', undockWindow);

                function undockWindow() {
                    //console.warn('undock?!');
                    me.managedState.mainWindow.leaveGroup(function() {

                        var targetRoot = me.managedState.dockingTarget.dockee,
                            target = targetRoot && targetRoot.name;

                        fin.desktop.InterApplicationBus.publish("dock-undocked", {
                            target: target,
                            name: me.managedState.mainWindow.name
                        });

                        me.managedState.isDocked = false;
                        me.managedState.canDock = true;

                        //dock.style.visibility = 'visible';
                        undock.style.visibility = 'hidden';


                    }, function(err) {
                        console.warn(err);
                    });

                }

                function mouseUpOnDraggable() {
                    //console.warn('mouse up on draggable: can dock', me.managedState.canDock , ' !is docked: ', !me.managedState.isDocked);
                    if (me.managedState.canDock && !me.managedState.isDocked) {

                        //console.warn('the mouse has been upped', me.managedState.dockingTarget);

                        me.managedState.currentlyDocking = true;
                        var destination = {
                            top: me.managedState.dockingTarget.bounds.top,
                            left: me.managedState.dockingTarget.bounds.left + me.managedState.dockingTarget.bounds.width,
                            duration: 100
                        };

                        me.managedState.mainWindow.animate({
                                opacity: 0.7,
                                position: destination
                            }, {
                                interrupt: true
                            },
                            function() {
                                me.managedState.mainWindow.getBounds(function(bounds) {
                                    var topGood = (bounds.top === me.managedState.dockingTarget.bounds.top),
                                        leftGood = (bounds.left === me.managedState.dockingTarget.bounds.left + me.managedState.dockingTarget.bounds.width);

                                    if (topGood && leftGood) {
                                        //console.warn('this is the DockingTarget in the callback:', me.managedState.dockingTarget);
                                        var dockingWindow = fin.desktop.Window.wrap(me.managedState.dockingTarget.dockee.app_uuid, me.managedState.dockingTarget.dockee.name);

                                        //debugger
                                        me.managedState.mainWindow.joinGroup(dockingWindow, function() {
                                            //console.warn('this is the DockingTarget in the JOIN callback:', dockingWindow, me.managedState);

                                            //dock.style.visibility = 'hidden';
                                            undock.style.visibility = 'visible';

                                            fin.desktop.InterApplicationBus.publish("dock-docked", {
                                                target: me.managedState.dockingTarget.dockee.name,
                                                name: me.managedState.mainWindow.name
                                            });

                                            me.managedState.currentlyDocking = false;
                                            me.managedState.isDocked = true;
                                            me.managedState.canDock = false;
                                            //me.managedState.dockingTarget = false;

                                            // me.managedState.mainWindow.animate({
                                            //     opacity: 1
                                            // });

                                            //console.warn('it grouped just fine');
                                        },
                                        function(reason) {
                                            console.warn('it did not group', reason);
                                        });
                                    } //end if top left good
                                    else {
                                        console.warn('im not where I thought Id be ', bounds, me.managedState.dockingTarget.bounds);
                                    }
                                },
                                function(err) {
                                    console.warn('the err of the bounds ', err);
                                });
                            }); //end animate

                    } //end if docking target
                }


                fin.desktop.InterApplicationBus.subscribe('*', 'dock-docked', function(data) {

                  me.managedState.currentlyDocking = false;
                  me.managedState.isDocked = true;
                  me.managedState.canDock = false;

                  undock.style.visibility = 'visible';

                });

                fin.desktop.InterApplicationBus.subscribe('*', 'dock-undocked', function(data) {
                  //console.warn('should have undocked');
                  me.managedState.isDocked = false;
                  me.managedState.canDock = true;

                  //dock.style.visibility = 'visible';
                  undock.style.visibility = 'hidden';

                });

                fin.desktop.InterApplicationBus.subscribe(dockingServerUuid, "dock:" + me.managedState.mainWindow.name, function(data) {


                    //!me.managedState.currentlyDocking &&
                    if ( !me.managedState.isDocked) {

                        //var isDockShowing = dock.style.display === 'block';

                        // if (!isDockShowing) {
                        //     //dock.style.visibility = 'visible';
                        // }

                        me.managedState.dockingTarget = data;
                        me.managedState.canDock = true;
                        //console.log('Ive been told to dock!', data);
                    }



                }); //end subscribe
                fin.desktop.InterApplicationBus.subscribe(dockingServerUuid, "dock-no-candidate:" + me.managedState.mainWindow.name, function(data) {

                    if (!me.managedState.currentlyDocking && !me.managedState.isDocked) {
                        //dock.style.visibility = 'hidden';
                        //me.managedState.dockingTarget = false;
                        me.managedState.canDock = false;
                        //console.warn('all alone... cant dock', data);
                    }

                }); //end subscribe


            }; //end init

            return me;

        })();
  });
