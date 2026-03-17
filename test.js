<div class="row flex-row-reverse align-items-center">
                                                <div class="col-md-6 col-lg-4 Contract-Value-Col">
                                                    <div class="row flex-row-reverse align-items-center g-2">
                                                        <div class="col-auto">قيمة العقد</div>
                                                        <div class="col-auto" id="contractValue">0.00</div>
                                                        <input hidden="" type="text" id="Contract_ContractValueBeforeDiscount" name="Contract.ContractValueBeforeDiscount" value="" autocomplete="off">
                                                        <div class="col-auto">
                                                            <img src="/BranchSys/CreateContract/img/Search_Icon.svg" id="payment-extra-details" style="display: none;">
                                                            <div class="dropdown-content payment-dropdown-content" id="dropdown-content-payment" style="display: none;">
                                                                <div class="data-container">
                                                                    <div class="row car-dropdown-content-row">
                                                                        <div class="col-auto ">
                                                                            <p>قيمة الإيجار</p>
                                                                        </div>
                                                                        <div class="col-auto personal-data-dropdown">
                                                                            <p id="RentValue">0.00</p>
                                                                        </div>

                                                                    </div>
                                                                    <div class="row car-dropdown-content-row" style="display: none;">
                                                                        <div class="col-auto ">
                                                                            <p>السائق الاضافي </p>
                                                                        </div>
                                                                        <div class="col-auto personal-data-dropdown">
                                                                            <p id="AddDriverValue">0</p>
                                                                        </div>

                                                                    </div>
                                                                    <div class="row car-dropdown-content-row" style="display: none;">
                                                                        <div class="col-auto ">
                                                                            <p>السائق الخاص</p>
                                                                        </div>
                                                                        <div class="col-auto personal-data-dropdown">
                                                                            <p id="PrivateDriverValue">0.00</p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row car-dropdown-content-row" style="display: none;">
                                                                        <div class="col-auto ">
                                                                            <p>قيمة الخيارات </p>
                                                                        </div>
                                                                        <div class="col-auto personal-data-dropdown">
                                                                            <p id="ChoicesValue">0.00</p>
                                                                        </div>

                                                                    </div>
                                                                    <div class="row car-dropdown-content-row" style="display: none;">
                                                                        <div class="col-auto ">
                                                                            <p>قيمة الاضافات </p>
                                                                        </div>
                                                                        <div class="col-auto personal-data-dropdown">
                                                                            <p id="AdditionalValue">0.00</p>
                                                                        </div>

                                                                    </div>
                                                                    <div class="row car-dropdown-content-row">
                                                                        <div class="col-auto ">
                                                                            <p>قيمة التفويض</p>
                                                                        </div>
                                                                        <div class="col-auto personal-data-dropdown">
                                                                            <p id="InFeesTammValue">0.00</p>
                                                                            <input hidden="" type="text" id="Contract_FeesTmmValue" name="Contract.FeesTmmValue" value="" autocomplete="off">
                                                                        </div>
                                                                    </div>
                                                                    <div class="row car-dropdown-content-row" style="display: none;">
                                                                        <div class="col-auto ">
                                                                            <p>رسوم شموس</p>
                                                                        </div>
                                                                        <div class="col-auto personal-data-dropdown">
                                                                            <p id="ShomoosFees">0.00</p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row car-dropdown-content-row" style="display: none;">
                                                                        <div class="col-auto ">
                                                                            <p>رسوم حكومية</p>
                                                                        </div>
                                                                        <div class="col-auto personal-data-dropdown">
                                                                            <p id="GovernmentFees">0.00</p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row car-dropdown-content-row" style="display: none;">
                                                                        <div class="col-auto ">
                                                                            <p>رسوم ادارية</p>
                                                                        </div>
                                                                        <div class="col-auto personal-data-dropdown">
                                                                            <p id="AdministrativeFees">0.00</p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row car-dropdown-content-row" style="display: none;">
                                                                        <div class="col-auto ">
                                                                            <p>رسوم أخرى</p>
                                                                        </div>
                                                                        <div class="col-auto personal-data-dropdown">
                                                                            <p id="OtherFees">0.00</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 col-lg-4" id="ReceivingBranch" style="display: none !important;">
                                                    <div class="row flex-row-reverse align-items-start gx-2">
                                                        <div class="col-auto centered-input-label">
                                                            <label for="Receiving-branch"> فرع التسليم </label>
                                                        </div>
                                                        <div class="col-md-7 personal-data">
                                                            <select class="form-select select-style" id="Receiving-branch-dropdown" data-val="true" data-val-required="الحقل مطلوب" name="Contract.BranchReceivingCode">
                                                                <option selected="" disabled=""></option>
                                                                    <option value="100" data-en="Head office" data-ar="الرئيسي" data-code="">
الرئيسي                                                                    </option>
                                                                    <option value="102" data-en="jaarana" data-ar="جعرانة" data-code="">
جعرانة                                                                    </option>
                                                                    <option value="103" data-en="AlSarif" data-ar="الوشحاء" data-code="">
الوشحاء                                                                    </option>
                                                                    <option value="104" data-en="AlWashhaa" data-ar="الصريف" data-code="">
الصريف                                                                    </option>
                                                                    <option value="105" data-en="Hadaba" data-ar="الهضبة" data-code="">
الهضبة                                                                    </option>
                                                            </select>
                                                            <div class="row requird-field-row-last">
                                                                <span class="requird-field field-validation-valid" data-valmsg-for="Contract.BranchReceivingCode" data-valmsg-replace="true"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-auto" style="display:none !important">
                                                    <div class="row g-1 align-items-center flex-row-reverse">
                                                        <div class="col-sm-auto External-delegation-col centered-input-label">
                                                            <div class="form-check Driver-checks">
                                                                <label class="form-check-label" for="External-delegation"> تفويض الخارجي</label>
                                                                <input class="External-delegation-input form-check-input" type="checkbox" name="External-delegation-checkbox" value="checked" id="Delegate-out" autocomplete="off">
                                                            </div>
                                                        </div>
                                                        <div class="col-auto" id="External-delegation-container">
                                                            <select class="form-select select-style" id="External-delegation-dropdown" name="External-delegation-dropdown">
                                                                <option selected="" disabled=""></option>
                                                                <option value="">دول الخليج </option>
                                                                <option value="">الدول العربية</option>
                                                                <option value="">جميع الدول</option>
                                                            </select>
                                                            <div class="row requird-field-row-last">
                                                                <span class="requird-field"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
