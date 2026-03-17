    <script>
        document.addEventListener("DOMContentLoaded", function () {
            // --- 1. Data and Constants ---
            const dataLists = {
                Cars: [{"text":"\u0647\u064A\u0648\u0646\u062F\u0627\u064A - \u0623\u0632\u064A\u0631\u0627 - \u00A0\u0633\u064A\u062F\u0627\u0646 \u0635\u063A\u064A\u0631\u0629 - 2019","value":"2019000002","count":5,"image":"/images/Bnan/Models/3100000002_20260304223714.png"},{"text":"\u0646\u064A\u0633\u0627\u0646 - \u0645\u0627\u0643\u0633\u064A\u0645\u0627 - \u0633\u064A\u062F\u0627\u0646 \u0643\u0628\u064A\u0631 - 2021","value":"2021000012","count":6,"image":"/images/Bnan/Models/3100000012_20260308145310.png"}]
            };

            const carNameInput = document.getElementById("CarName");
            const startDateInput = document.getElementById("start-date");
            const endDateInput = document.getElementById("End-date");
            const carCodeField = document.getElementById("CrCasPriceCarBasicDistributionCode");

            let isTrue = false;
            const today = new Date();
            const todayStr = today.toISOString().split("T")[0];

            // --- 2. Date Field Initialization ---
            startDateInput.disabled = true;
            endDateInput.disabled = true;
            startDateInput.max = todayStr;
            endDateInput.min = todayStr;

            function updateDateFields() {
                if (isTrue) {
                    startDateInput.disabled = false;
                } else {
                    startDateInput.disabled = true;
                    endDateInput.disabled = true;
                    startDateInput.value = "";
                    endDateInput.value = "";
                }
            }

            function clearNumberInputs() {
                $(".number-input.PriceInputs").val("");
            }

            startDateInput.addEventListener("change", function () {
                if (startDateInput.value) {
                    endDateInput.disabled = false;
                    let minByStartDate = new Date(startDateInput.value);
                    minByStartDate.setDate(minByStartDate.getDate() + 1);
                    let finalMinDate = (minByStartDate > today) ? minByStartDate : today;
                    endDateInput.min = finalMinDate.toISOString().split("T")[0];

                    if (endDateInput.value && new Date(endDateInput.value) < finalMinDate) {
                        endDateInput.value = "";
                    }
                } else {
                    endDateInput.disabled = true;
                    endDateInput.value = "";
                }
            });

            // --- 3. Enhanced Autocomplete Logic (Integrated) ---
            function setupAutocomplete(inputId, listId, dataList, errorElementId, statusFlagName, validate) {
                const $input = $("#" + inputId);
                const $list = $("#" + listId);
                const $hiddenCode = $("#" + inputId + "-code"); // For the hidden value
                const $errorMessage = $("#" + errorElementId);
                const $carCodeField = $("#CrCasPriceCarBasicDistributionCode"); // Original specific field

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
                        'position': 'absolute', 'visibility': 'hidden', 'white-space': 'nowrap',
                        'font-size': '1rem', 'padding': '8px 12px'
                    }).appendTo('body');
                    items.forEach(item => {
                        tempDiv.text(item);
                        const width = tempDiv.outerWidth();
                        if (width > maxWidth) maxWidth = width;
                    });
                    tempDiv.remove();
                    return window.innerWidth < 768 ? Math.min(Math.max(maxWidth + 30, 150), 250) : maxWidth + 30;
                }

               function updateAutocompletePosition() {
                    if ($list.is(":visible")) {
                        const inputRect = $input[0].getBoundingClientRect();
                        const viewportHeight = window.innerHeight;
                        const visibleItems = $list.find('div').toArray().map(div => div.textContent);
                        const calculatedWidth = getMaxItemWidth(visibleItems);

                        const spaceBelow = viewportHeight - inputRect.bottom - 10;

                        $list.css({
                            'position': 'fixed',
                            'width': calculatedWidth + 'px',
                            'top': (inputRect.bottom + 3) + 'px',
                            'left': inputRect.left + 'px',
                            'max-height': Math.min(spaceBelow, 250) + 'px', // ← أقصى 250px وبعدين scroll
                            'overflow-y': 'auto' // ← الـ scroll
                        });
                        updateArrowPosition();
                    }
                }

               function updateArrowPosition() {
                    const listRect = $list[0].getBoundingClientRect();
    
                    $arrow.css({
                        'position': 'fixed',
                        'z-index': '10001',
                        'display': 'block',
                        'top': (listRect.top + 10) + 'px',
                        // RTL ← السهم على اليمين  |  LTR ← السهم على الشمال
                        'left': isRTL ? (listRect.right + 2) + 'px' : (listRect.left - 10) + 'px',
                        'border-right': isRTL ? 'none' : '8px solid #d3d3d3',
                        'border-left': isRTL ? '8px solid #d3d3d3' : 'none',
                        'border-bottom': '8px solid transparent',
                        'border-top': '8px solid transparent'
                    });
                }

                $input.on("input", function () {
                    const value = this.value.trim().toLowerCase();
                    $list.empty();

                    // Original trigger: clear fields on typing
                    clearNumberInputs();
                    isTrue = false;
                    updateDateFields();

                    let matchesFound = false;
                    dataList.forEach(item => {
                        if (item.text.toLowerCase().includes(value) || value === "") {
                            $list.append(`<div data-name="${item.text}" data-value="${item.value}" data-image="${item.image}" data-count="${item.count}">${item.text}</div>`);
                            matchesFound = true;
                        }
                    });

                    if (matchesFound) {
                        $list.show();
                        setTimeout(updateAutocompletePosition, 10);
                    } else {
                        $list.hide();
                        $arrow.hide();
                    }
                });

                $(document).on("click", "#" + listId + " div", function () {
                    const selectedText = $(this).data("name");
                    const carImage = $(this).data("image");
                    const carCount = $(this).data("count");
                    const carCode = $(this).data("value");

                    $input.val(selectedText);
                    $carCodeField.val(carCode);
                    $list.hide();
                    $arrow.hide();

                    // Image Preview Logic
                    const imgPath = carImage.includes("/") ? carImage : `../../../images/Demo/${carImage}`;
                    if ($('.carImagePreview img').length) {
                        $('.carImagePreview img').attr('src', imgPath);
                    } else {
                        $('.carImagePreview').append($('<img>').attr('src', imgPath));
                    }

                    $(".CarsCount").text(carCount);
                    isTrue = true;
                    $errorMessage.text("");
                    $input.removeClass("is-invalid");
                    updateDateFields();
                });

                $input.on("blur", function () {
                    setTimeout(() => {
                        const inputValue = $input.val().trim();
                        const carExists = dataList.some(car => car.text === inputValue);
                        if (!carExists && inputValue !== "") {
                            $errorMessage.text("الحقل مطلوب");
                            $input.addClass("is-invalid");
                            $carCodeField.val("");
                            $(".carImagePreview img").attr("src", "");
                            $(".CarsCount").text("");
                            isTrue = false;
                        } else if (carExists) {
                            isTrue = true;
                            $errorMessage.text("");
                            $input.removeClass("is-invalid");
                        }
                        updateDateFields();
                    }, 250);
                });

                $(document).click(function (e) {
                    if (!$(e.target).closest($list).length && !$(e.target).closest($input).length) {
                        $list.hide();
                        $arrow.hide();
                    }
                });
            }

            setupAutocomplete("CarName", "autocomplete-Cars", dataLists.Cars, "CrCasPriceCarBasicDistributionCode-Error");
        });
    </script>
