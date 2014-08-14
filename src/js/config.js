mdl.config([

    "$translateProvider",
    function ($translateProvider) {
        $translateProvider.translations("cs", {
            SZN_LOGIN: {
                LOGIN: {
                    LOST_PASSWORD: "Zaslat zapomenuté heslo",
                    REMEMBER_ME: "Pamatovat si mě na tomto počítači",
                    NOT_REGISTERED: "Nejste zaregistrováni na Seznam.cz",
                    REGISTER_NOW: "Registrujte se",
                    USERNAME_PLACEHOLDER: "Libovolný e-mail",
                    PASSWORD_PLACEHOLDER: "Heslo",
                    LOG_IN: "Přihlásit se",
                    COOKIES_NOTIFY: "Pro správné přihlášení je potřeba zapnout cookies. Nevíte se rady? Podívejte se do",
                    HELP: "nápovědy",
                    WEAKPASSWORD_CONTINUE: "Pokračovat se současným heslem",
                    CHANGE_PASSWORD: "Změnit heslo",
                    ERROR: {
                        BAD_LOGIN: "Neexistující uživatel nebo chybné heslo",
                        FORBIDDEN: "Váš účet je zablokován",
                        WEAK_PASSWORD: "Vaše heslo je příliš jednoduché",
                        INTERNAL: "Interní chyba systému",
                        CONNECTION: "Nemůžeme se spojit s našimi servery. Zkuste to, prosím, později"
                    }
                },
                REGISTER: {
                    REGISTER_START: "Registrujte",
                    REGISTER_END: "se a získáte obsah všech služeb Seznam.cz přímo na míru vašim potřebám",
                    USERNAME_PLACEHOLDER: "Libovolný e-mail",
                    PASSWORD_PLACEHOLDER: "Heslo",
                    PASSWORD_REPEAT_PLACEHOLDER: "Zopakujte heslo",
                    CONTINUE: "Pokračovat",
                    AGREEMENT: "Registrací souhlasíte s",
                    TERMS: "podmínkami služby",
                    TERMS_NOTIFY: "Před pokračováním musíte souhlasit s podmínkami služby",
                    ALREADY_REGISTERED: "Jsem registrovaný a chci se přihlásit",
                    CREATE_EMAIL: "Nemám e-mail a chci ho vytvořit",
                    ERROR: {
                        0: "Nemůžeme se spojit s našimi servery. Zkuste to, prosím, později",
                        404: "Tento e-mail je u nás již registrován",
                        406: "K registraci chybí heslo",
                        420: "Vaše heslo je příliš slabé",
                        421: "Vaše heslo je příliš slabé",
                        422: "Vaše heslo je příliš krátké. Zadejte delší",
                        423: "Vaše heslo je příliš dlouhé. Zadejte kratší",
                        424: "Heslo obsahuje nepovolené znaky",
                        425: "Na začátku či na konci hesla nesmí být mezera",
                        426: "Hesla se neshodují",
                        427: "Tato schránka ještě neexistuje. Kliknutím na 'Pokračovat' ji zaregistrujete.",
                        430: "Příliš krátký e-mail",
                        431: "Zadaný e-mail je neplatný",
                        500: "Interní chyba systému"
                    }
                },
                VERIFY: {
                    FINISH_REGISTRATION: "Pro dokončení klikněte na odkaz, který jsme vám poslali na e-mail nebo opište zaslaný kód",
                    CODE_PLACEHOLDER: "Zadejte obdržený kód",
                    FINISH: "Dokončit",
                    NOT_OBTAINED: "Nepřišel vám kód",
                    SEND_CODE_AGAIN: "Zaslat znovu ověřovací kód",
                    CHECK_YOUR_EMAIL: "Zkontrolujte svou e-mailovou schránku, kam jsme vám zaslali nový ověřovací kód",
                    ERROR: {
                        403: "Zadaný kód je neplatný",
                        500: "Interní chyba systému"
                    }
                },
                DONE: {
                    CONGRATULATION: "Blahopřejeme",
                    SUCCESS: "registrace proběhla úspěšně",
                    GO: "Vstoupit na"
                }
            }
        });

        $translateProvider.translations("en", {
            SZN_LOGIN: {
                LOGIN: {
                    LOST_PASSWORD: "Send lost password",
                    REMEMBER_ME: "Remember my details on this computer",
                    NOT_REGISTERED: "Not register on Seznam.cz yet?",
                    REGISTER_NOW: "Register now",
                    USERNAME_PLACEHOLDER: "Your e-mail",
                    PASSWORD_PLACEHOLDER: "Password",
                    LOG_IN: "Log in",
                    COOKIES_NOTIFY: "You need to have allowed cookies for successful login. Are you in trouble? Look at",
                    HELP: "our help",
                    WEAKPASSWORD_CONTINUE: "Continue with current password",
                    CHANGE_PASSWORD: "Change password",
                    ERROR: {
                        BAD_LOGIN: "Not existing username or wrong password",
                        FORBIDDEN: "Your account was banned",
                        WEAK_PASSWORD: "Your password is too weak",
                        INTERNAL: "Internal system error",
                        CONNECTION: "We can not connect to our servers. Try it please later"
                    }
                },
                REGISTER: {
                    REGISTER_START: "Register now",
                    REGISTER_END: "and you can get access to all Seznam.cz services",
                    USERNAME_PLACEHOLDER: "Your e-mail",
                    PASSWORD_PLACEHOLDER: "Password",
                    PASSWORD_REPEAT_PLACEHOLDER: "Repeat password",
                    CONTINUE: "Continue",
                    AGREEMENT: "With registering you agree with",
                    TERMS: "service terms",
                    TERMS_NOTIFY: "Before continue you have to accept our terms",
                    ALREADY_REGISTERED: "I am already registered and want to log in",
                    CREATE_EMAIL: "I do not have e-mail on Seznam.cz and I want to create it.",
                    ERROR: {
                        0: "We can not connect to our servers. Try it please later",
                        404: "This e-mail is already registered",
                        406: "We are missing password",
                        420: "Your password is too weak",
                        421: "Your password is too weak",
                        422: "Your password is too short. Type longer password.",
                        423: "Your password is too long. Type shorter password",
                        424: "Your password contains unallowed characters.",
                        425: "Your password can not contain white space at start or at end",
                        426: "Your passwords do not match",
                        427: "This e-mail is not registered yet. Click on 'Continue' for registration finish",
                        430: "Too short e-mail",
                        431: "E-mail is not valid",
                        500: "Internal system error"
                    }
                },
                VERIFY: {
                    FINISH_REGISTRATION: "For finish click on link we sent you to your e-mail or re-type sent code",
                    CODE_PLACEHOLDER: "Zadejte obdržený kód",
                    FINISH: "Dokončit",
                    NOT_OBTAINED: "Code not obtained",
                    SEND_CODE_AGAIN: "Send verification code again",
                    CHECK_YOUR_EMAIL: "Check your e-mail, we have sent you another verification code",
                    ERROR: {
                        0: "We can not connect to our servers. Try it please later",
                        403: "Code is not valid",
                        500: "Internal system error"
                    }
                },
                DONE: {
                    CONGRATULATION: "Congratulations",
                    SUCCESS: "registrion was successful",
                    GO: "Go to"
                }
            }
        });

        $translateProvider.preferredLanguage("cs");
    }

]);