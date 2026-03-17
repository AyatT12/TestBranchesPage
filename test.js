 <script>
        const cars = [
            {
                text: "هيونداي - أكسنت -  سيدان متوسطة - 2021 - س و ص 1870 - بني",
                value: "1700000003",
                image: "DefaultCar.png",
                count: 15
            },
            {
                text: "فورد - تورس -  سيدان متوسطة - 2021 - د ق هـ 4707 - رمادي",
                value: "1700000004",
                image: "DefaultCar.png",
                count: 10
            },
            {
                text: "كيا - تيلورايد -  عائلية كبيرة - 2021 - ص هـ ن 0420 - بنفسجي",
                value: "1700000005",
                image: "DefaultCar.png",
                count: 5
            },
            {
                text: "لكزس - اي اس -  فخمة متوسطة - 2020 - س و س 2877 - أبيض",
                value: "1700000006",
                image: "DefaultCar.png",
                count: 8
            }
        ];

        const dataLists = { Cars: cars };

        $(document).ready(function () {
            function setupAutocomplete(inputId, listId, dataList, errorElementId, statusFlagName, validate) {
                const $input = $("#" + inputId);
                const $list = $("#" + listId);
                const $hiddenCode = $("#" + inputId + "-code");
                const $error = $("#" + errorElementId);

                // Arrow Initialization
                const $arrow = $('<div class="autocomplete-arrow"></div>');
                $('body').append($arrow);

                function detectDirection() {
                    const bodyStyle = window.getComputedStyle(document.body);
                    const htmlStyle = window.getComputedStyle(document.documentElement);
                    if (bodyStyle.direction === 'rtl' || htmlStyle.direction === 'rtl' ||
                        $('body').hasClass('rtl') || $('html').hasClass('rtl')) return 'rtl';
                    return 'ltr';
                }

                const isRTL = detectDirection() === 'rtl';

                function getMaxItemWidth(items) {
                    let maxWidth = 200;
                    const tempDiv = $('<div>').css({
                        'position': 'absolute',
                        'visibility': 'hidden',
                        'white-space': 'nowrap',
                        'font-size': '1rem',
                        'font-family': 'inherit',
                        'padding': '8px 12px'
                    }).appendTo('body');

                    items.forEach(item => {
                        tempDiv.text(item);
                        const width = tempDiv.outerWidth();
                        if (width > maxWidth) {
                            maxWidth = width;
                        }
                    });

                    tempDiv.remove();

                    const isMobile = window.innerWidth < 768;
                    let finalWidth = maxWidth + 30;

                    if (isMobile) {
                        finalWidth = Math.min(Math.max(finalWidth, 150), 250);
                    } else {
                        finalWidth = Math.max(finalWidth);
                    }

                    return finalWidth;
                }

                function updateAutocompletePosition() {
                    if ($list.is(":visible")) {
                        const inputRect = $input[0].getBoundingClientRect();
                        const viewportHeight = window.innerHeight;
                        const viewportWidth = window.innerWidth;

                        const visibleItems = $list.find('div').toArray().map(div => div.textContent);
                        const calculatedWidth = getMaxItemWidth(visibleItems);
                        $list.css('width', calculatedWidth + 'px');

                        let leftPosition;
                        if (isRTL) {
                            leftPosition = inputRect.left - (calculatedWidth - 230);
                            if (leftPosition < 10) {
                                leftPosition = 10;
                            }
                        } else {
                            leftPosition = inputRect.right - (calculatedWidth - 230);
                            if (leftPosition + calculatedWidth > viewportWidth - 10) {
                                leftPosition = viewportWidth - calculatedWidth - 10;
                            }
                        }

                        const spaceBelow = viewportHeight - inputRect.bottom;
                        const spaceAbove = inputRect.top;
                        const maxHeight = Math.min(spaceBelow);

                        $list.css({
                            'top': (inputRect.top + 3) + 'px',
                            'left': leftPosition + 'px',
                            'max-height': maxHeight + 'px',
                            'height': 'auto'
                        });

                        updateArrowPosition();
                    }
                }

                function updateArrowPosition() {
                    const listRect = $list[0].getBoundingClientRect();
                    let arrowStyle = {
                        'position': 'fixed', 'z-index': '10001', 'display': 'block',
                        'pointer-events': 'none', 'top': (listRect.top + 10) + 'px'
                    };

                    if (isRTL) {
                        arrowStyle['left'] = (listRect.right + 2) + 'px';
                        arrowStyle['border-left'] = '8px solid #d3d3d3';
                        arrowStyle['border-right'] = 'none';
                    } else {
                        arrowStyle['left'] = (listRect.left - 10) + 'px';
                        arrowStyle['border-left'] = 'none';
                        arrowStyle['border-right'] = '8px solid #d3d3d3';
                    }
                    arrowStyle['border-bottom'] = '8px solid transparent';
                    arrowStyle['border-top'] = '8px solid transparent';

                    $arrow.css(arrowStyle);
                }

                // Input Logic with match check
                $input.on("input", function () {
                    const value = this.value.trim().toLowerCase();
                    $list.empty();

                    if (validate) {
                        $hiddenCode.val('');
                        $error.text('');
                    }

                    if (value === "") {
                        dataList.forEach(item => {
                            $list.append(`<div data-value="${item.value}" data-image="${item.image}" data-count="${item.count}">${item.text}</div>`);
                        });

                        $list.show();
                        setTimeout(() => {
                            updateAutocompletePosition();
                            $list.find('div').first().addClass('active');
                        }, 10);

                        return;
                    }

                    let matchesFound = false;

                    dataList.forEach(item => {
                        if (item.text.trim().toLowerCase().includes(value)) {
                            $list.append(`<div data-value="${item.value}" data-image="${item.image}" data-count="${item.count}">${item.text}</div>`);
                            matchesFound = true;
                        }
                    });

                    if (matchesFound) {
                        $list.show();
                        setTimeout(() => {
                            updateAutocompletePosition();
                            $list.find('div').first().addClass('active');
                        }, 10);
                    } else {
                        $list.hide();
                        $arrow.hide();
                    }
                });

                // عند اختيار سيارة
                $list.on("click", "div", function () {
                    const text = $(this).text();
                    const val = $(this).data("value");
                    const carImage = $(this).data("image");
                    const carCount = $(this).data("count");

                    $input.val(text);
                    $hiddenCode.val(val);

                    // عرض الصورة
                    if ($('.carImagePreview img').length) {
                        $('.carImagePreview img').attr('src', `../../../images/Demo/${carImage}`);
                    }
                    else {
                        const img = $('<img>').attr('src', `../../../images/Demo/${carImage}`);
                        $('.carImagePreview').append(img);
                    }

                    // عرض العدد
                    $(".CarsCount").text(carCount);

                    if (validate) {
                        $error.text('');
                        window[statusFlagName] = true;
                    }

                    $list.hide();
                    $arrow.hide();
                    $input.focus();
                });

                // Blur Validation
                if (validate) {
                    $input.on("blur", function () {
                        setTimeout(() => {
                            const currentVal = $(this).val();
                            const match = dataList.find(i => i.text === currentVal);
                            if (!match && currentVal !== "") {
                                $error.text("This Field Is Required");
                                window[statusFlagName] = false;
                                $hiddenCode.val('');
                            }
                        }, 200);
                    });
                }

                $(document).on("click", function (e) {
                    if (!$(e.target).closest($input).length && !$(e.target).closest($list).length) {
                        $list.hide();
                        $arrow.hide();
                    }
                });
            }

            setupAutocomplete("CarName", "autocomplete-Cars", dataLists.Cars);
        });
    </script>
